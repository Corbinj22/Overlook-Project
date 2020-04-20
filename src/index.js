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

$('.login-box').keyup(function() {
  if ($('#login-Name').val().length >= 1 && $('#login-Password').val().length >= 1) {
    $('#login-image').removeClass("disabled")
  } else {
    $('#login-image').addClass("disabled")
  }
})

$('#login-image').click(function() {
  if (!$(this).hasClass('disabled')) {
    var userName = $('#login-Name').val()
    var userPassword = $('#login-Password').val()
  }
  changeLoadPage(userName, userPassword)
})

$('.static-container').change(function(event) {
  if (event.target.id === "user-requested-booking-date") {
    let userRequestedDate = $("#user-requested-booking-date").val()
    domUpdates.insertAvailableRooms(userRequestedDate, bookingData, roomsData)
  }
})

$('.static-container').click(function(event) {
  if ($('#available-room-details').find('input[type= radio]:checked').attr('id')) {
    $('#booking-button').removeClass('disabled')
  }

  if ($(event.target).hasClass('search-guest-button')) {
    let todayDate = moment().format('YYYY/MM/DD')
    let searchedName = $('.search-guest-input').val()
    let foundUser = userData.find(user => user.name === searchedName)
    // currentUser.getUserFutureBookings(foundUser, todayDate, bookingData)
    // currentUser.getUserPastBookings(foundUser)
    domUpdates.insertGuestFutureBookings(currentUser.getUserFutureBookings(foundUser, todayDate, bookingData))
    // domUpdates.displayUserPastBookings(foundUser)
  }
})

$(document).on('submit','.user-interaction-box', function(event) {
  event.preventDefault()
  let requestedDate = $("#user-requested-booking-date").val()
  let formatedDate = requestedDate.split('-').join('/')
  let pickedRoom = $('#available-room-details').find('input[type= radio]:checked').attr('id')
  let userBookingRequest = {userId: parseInt(currentUser.id), date: formatedDate, roomNumber: parseInt(pickedRoom)}
  fetcher.postBookingsData(userBookingRequest);
  currentUser.createNewBooking(pickedRoom, requestedDate, generateRandomString())
  domUpdates.insertFutureBookings(currentUser)
})

function changeLoadPage(userName, userPassword) {
  let userId = parseInt(userName.match(/\d+/));
  let todayDate = moment().format('YYYY/MM/DD')

  if (userName === 'manager' && userPassword === 'overlook2020') {
    currentUser = new Manager();
    currentUser.getDailyRevenue(bookingData, todayDate, roomsData)
    domUpdates.displayMangerPage(currentUser)

  } else if (userId <= 50 && userName.includes('customer') && userPassword === 'overlook2020') {
    let currentUserData = userData[userId]
    currentUser = new User(currentUserData)
    currentUser.getFutureBookings(bookingData)
    currentUser.getPastBookings(bookingData)
    currentUser.getTotalSpent(bookingData, roomsData)
    domUpdates.displayUserPage(currentUser)

  } else {
    $('#error-login-text').text('Please enter a valid Username an Password')
  }
}

function generateRandomString() {
   let randomString = Math.random().toString(36).substring(2, 14) + Math.random().toString(36).substring(2, 9)
   return randomString;
}

getAllData().then(data => setData(data))
