import $ from 'jquery';
import './css/base.scss';
import Fetcher from './Fetcher';
import  User from './user';
import Manger from './manager';
import domUpdates from './domUpdates';

const fetcher = new Fetcher()
let userData;
let bookingData;
let roomsData;
// let currentUser;

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

//global test eventListener////
// document.querySelector('body').addEventListener('click',() => {
//   console.log(roomsData)
// })
//////

getAllData().then(data => setData(data))
