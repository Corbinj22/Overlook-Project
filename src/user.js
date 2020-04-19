const moment = require('moment')

class User {
  constructor(userDetails) {
    this.name = userDetails.name;
    this.id = userDetails.id;
    this.futureBookings = [];
    this.pastBookings = [];
    this.totalSpent = 0;
  }

  getFutureBookings(bookingData) {
    let todayDate = moment().format('YYYY/MM/DD')
    this.futureBookings = bookingData
      .filter(booking => booking.userID === this.id)
      .filter(booking => booking.date > todayDate)
  }

  getPastBookings(bookingData) {
    let todayDate = moment().format('YYYY/MM/DD')
    this.pastBookings = bookingData
      .filter(booking => booking.userID === this.id)
      .filter(booking => booking.date < todayDate)
  }

  getTotalSpent(bookingData, roomsData) {
    let allUserBookings = bookingData.filter(booking => booking.userID === this.id)
    let currentUserTotal = allUserBookings.reduce((acc, userBooking) => {
      let roomValue = roomsData.find(room => room.number === userBooking.roomNumber).costPerNight
      acc += roomValue
      return acc;
    }, 0)
    this.totalSpent = currentUserTotal;
  }

  createNewBooking(pickedRoom, requestedDate, randomNumber) {
    let userBooking = {id: randomNumber, userId: this.id, date: requestedDate, roomNumber: parseInt(pickedRoom), roomServiceCharges: []}
    this.futureBookings.push(userBooking)
  }

}

export default User;
