import $ from 'jquery';
import './css/base.scss';
import Fetcher from './Fetcher';
import  User from './user';
import Manager from './manager';
import domUpdates from './domUpdates.js'
const fetcher = new Fetcher()

let userData;
let bookingData;
let roomsData;
let currentUser;
const moment = require('moment')

function getAllData() {
  let fetchedUserData = fetcher.fetchUserData()
    .then(data => data);
  let fetchedBookingsData = fetcher.fetchBookingsData()
    .then(data => data);
  let fetchedRoomsData = fetcher.fetchRoomsData()
    .then(data => data);
  return Promise.all([fetchedUserData, fetchedBookingsData, fetchedRoomsData]);
}

function setData(data) {
  userData = data[0].users;
  bookingData = data[1].bookings;
  roomsData = data[2].rooms;
}

function changeLoadPage(userName, userPassword) {
  let userId = parseInt(userName.match(/\d+/));
  let todayDate = moment().format('YYYY/MM/DD')
  if (userName === 'manager' && userPassword === 'overlook2020') {
    currentUser = new Manager();
    currentUser.getDailyRevenue(bookingData, todayDate, roomsData)
    domUpdates.displayMangerPage(currentUser)
    domUpdates.displayTotalDailyBooked(bookingData, todayDate, roomsData)
    domUpdates.displayPercentageRoomsAvailable(bookingData, todayDate, roomsData)
    setDate()
  } else if (userId <= 50 && userName.includes('customer') && userPassword === 'overlook2020') {
    let currentUserData = userData[userId]
    currentUser = new User(currentUserData)
    currentUser.getFutureBookings(bookingData)
    currentUser.getPastBookings(bookingData)
    currentUser.getTotalSpent(bookingData, roomsData)
    domUpdates.displayUserPage(currentUser)
    setDate()
  } else {
    $('#error-login-text').text('Please enter a valid Username an Password')
  }
}

$('.login-box').keyup(function() {
  if ($('#login-Name').val().length >= 1 && $('#login-Password').val().length >= 1) {
    $('#login-button').removeClass("disabled")
  } else {
    $('#login-button').addClass("disabled")
  }
})

$('#login-button').click(function() {
  if (!$(this).hasClass('disabled')) {
    var userName = $('#login-Name').val()
    var userPassword = $('#login-Password').val()
  }
  changeLoadPage(userName, userPassword)
})

$('.static-container').change(function(event) {
  if ($(event.target).hasClass('user-requested-booking-date')) {
    let userRequestedDate = $(".user-requested-booking-date").val()
    domUpdates.insertAvailableRooms(userRequestedDate, bookingData, roomsData)
  }
})

$('.static-container').click(function(event) {
  if ($('.available-room-details').find('input[type= radio]:checked').attr('id')) {
    $('.booking-button').removeClass('disabled')
  }

  if ($(event.target).hasClass('search-guest-button')) {
    let todayDate = moment().format('YYYY/MM/DD')
    let searchedName = $('.search-guest-input').val()
    let foundUser = userData.find(user => user.name === searchedName)
    domUpdates.insertGuestFutureBookings(currentUser.getUserFutureBookings(foundUser, todayDate, bookingData))
    domUpdates.insertGuestPastBookings(currentUser.getGuestPastBookings(foundUser, todayDate, bookingData))
    domUpdates.insertGuestName(foundUser)
    domUpdates.insertGuestTotalSpent(foundUser, bookingData, roomsData)
    $('.manager-create-booking').css("display", "flex")
  }

  if ($(event.target).hasClass('delete-booking-button')) {
    let targetId = parseInt(event.target.id)
    fetcher.deleteReservation(targetId)
    domUpdates.deleteGuestBooking(targetId)
    getAllData().then(data => setData(data))
  }
})

$(document).on('submit', '.user-interaction-box', function(event) {
  event.preventDefault()
  let requestedDate = $(".user-requested-booking-date").val()
  let formatedDate = requestedDate.split('-').join('/')
  let pickedRoom = $('.available-room-details').find('input[type= radio]:checked').attr('id')
  let userBookingRequest = {userId: parseInt(currentUser.id), date: formatedDate, roomNumber: parseInt(pickedRoom)}
  fetcher.postBookingsData(userBookingRequest);
  currentUser.createNewBooking(pickedRoom, formatedDate, generateRandomString())
  domUpdates.insertFutureBookings(currentUser)
  getAllData().then(data => setData(data))
})

$(document).on('submit', '.manager-create-booking', function(event) {
  event.preventDefault()
  let searchedName = $('.search-guest-input').val()
  let foundUser = userData.find(user => user.name === searchedName)
  let requestedDate = $(".user-requested-booking-date").val()
  let formatedDate = requestedDate.split('-').join('/')
  let pickedRoom = $('.available-room-details').find('input[type= radio]:checked').attr('id')
  let userBookingRequest = {userId: parseInt(foundUser.id), date: formatedDate, roomNumber: parseInt(pickedRoom)}
  fetcher.postBookingsData(userBookingRequest).then(data => domUpdates.displayUpdatedFutureGuestBookings(data));
  getAllData().then(data => setData(data))
})

function generateRandomString() {
  let randomString = Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 9)
  return randomString;
}

function setDate() {
  $('.user-requested-booking-date').attr('min', moment().format('YYYY-MM-DD'))
}

getAllData().then(data => setData(data))
