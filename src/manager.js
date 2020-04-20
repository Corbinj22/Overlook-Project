import domUpdates from './domUpdates.js'

class Manager {
  constructor() {
    this.dailyRevenue = undefined;
  }
  getDailyRevenue(bookingData, currentDate, roomsData) {
    let allDailyBookings = bookingData.filter(booking => booking.date === currentDate)
    let rooms = allDailyBookings.map(booking => roomsData.find(room => room.number === booking.roomNumber))
    let totalRevenue = rooms.reduce((acc, room) => {
      return acc += room.costPerNight;
    }, 0).toFixed(2)
    this.dailyRevenue = totalRevenue;
    return totalRevenue
  }

  getUserFutureBookings(foundUser, todayDate, bookingData) {
    let usersPastBookings = bookingData
      .filter(booking => booking.userID === foundUser.id)
      .filter(booking => booking.date < todayDate)
    return usersPastBookings;
  }

  getUserPastBookings(foundUser, todayDate, bookingData) {
    let usersPastBookings = bookingData
      .filter(booking => booking.userID === foundUser.id)
      .filter(booking => booking.date > todayDate)
    return usersPastBookings;
  }
}

export default Manager;
