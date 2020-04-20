
class Manager {
  constructor() {

  }

  getDailyRevenue(bookingData, currentDate, roomsData) {
    let allDailyBookings = bookingData.filter(booking => booking.date === currentDate)
    let rooms = allDailyBookings.map(booking => roomsData.find(room => room.number === booking.roomNumber))
    let totalRevenue = rooms.reduce((acc, room) => {
      return acc += room.costPerNight;
    }, 0).toFixed(2)
    return totalRevenue
  }

  // getDailyAvailableRooms(bookingData, currentDate, roomsData) {
  //   let formatedDate = requestedDate.split('-').join('/')
  //   let bookingsPerDay = bookingData
  //     .filter(booking => booking.date === formatedDate)
  //     .map(room => room.roomNumber)
  //   let availableRooms = roomsData.filter(room => {
  //     if (!bookingsPerDay.includes(room.number)) {
  //       return room;
  //     }
  // }
}

export default Manager;
