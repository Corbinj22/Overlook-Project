import $ from 'jquery';
import './css/base.scss';
import Fetcher from './Fetcher';
import  User from './user';
import Manger from './manager';
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

$('.static-container').change(function() {
  let test = $("#user-requested-booking-date").val()
  console.log(test);
})

function changeLoadPage(userName, userPassword) {
  var userId = parseInt(userName.match(/\d+/));
  if (userName === 'manager' && userPassword === 'overlook2020') {
    console.log(1);

  } else if (userId <= 50 && userName.includes('customer') && userPassword === 'overlook2020') {
    let currentUserData = userData[userId]
    currentUser = new User(currentUserData.name, currentUserData.id)
    currentUser.getFutureBookings(bookingData)
    currentUser.getPastBookings(bookingData)
    currentUser.getTotalSpent(bookingData, roomsData)
    domUpdates.displayUserPage(currentUser)
  } else {
    $('#error-login-text').text('Please enter a valid Username an Password')
  }
}


// $("#user-requested-booking-date").datepicker({
//    onSelect: function(dateText, inst) {
//       var dateAsString = dateText; //the first parameter of this function
//       var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
//    }
// });


getAllData().then(data => setData(data))
