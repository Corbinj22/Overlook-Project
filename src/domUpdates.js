import $ from 'jquery'

const domUpdates = {
  displayUserPage(currentUser) {
    $('.static-container').text(' ')
    $('.static-container').append(`<div class="welcome-message-box">
      <p id="user-welcome-message">Thank you for choosing to stay with Kebahagiaan Jungle Resort.
        You will find your personal information below</p>
    </div>
    <div class="user-important-info">
      <form class="user-interaction-box">
        <p id="booking-instructions">Please choose a date to create a new booking</p>
        <input class="user-requested-booking-date" type="date" name="date" required></input>
        <button class='disabled booking-button' type="submit" name="button">Create Booking</button>
        <fieldset class='available-room-details'>
        </fieldset>
        <p id='total-user-spent'></p>
      </form>
      <div class="user-upcoming-bookings-box">
        <p id="upcoming-bookings-text">All Upcoming Bookings</p>
        <ul id="user-upcoming-bookings-list">
        </ul>
      </div>
      <div class="user-past-bookings-box">
        <p id="past-bookings-text">All Past Bookings</p>
        <ul id="user-past-bookings-list">
        </ul>
      </div>
    </div>
    <div class="available-rooms-info">
      <div id="residential-suite-info" class="available-room">
        <p class="room-details">Residential Room</p>
        <img class="room-image" src="https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="">
        <p class="room-details">Room Price: $358.40</p>
        <p class="room-details">Number of Beds: 1</p>
        <p class="room-details">Size of Bed: Twin</p>
      </div>
      <div id="single-room-info" class="available-room">
        <p class="room-details">Single Room</p>
        <img class="room-image" src="https://images.unsplash.com/photo-1559841644-08984562005a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="">
        <p class="room-details">Room Price: $491.14</p>
        <p class="room-details">Number of Beds: 2</p>
        <p class="room-details">Size of Bed: Twin</p>
      </div>
      <div id="junior suite-info"class="available-room">
        <p class="room-details">Junior Suite</p>
        <img class="room-image" src="https://images.unsplash.com/photo-1586798407709-30e2036d01d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="">
        <p class="room-details">Room Price: $261.26</p>
        <p class="room-details">Number of Beds: 2</p>
        <p class="room-details">Size of Bed: King</p>
      </div>
      <div id="suite-info"class="available-room">
        <p class="room-details">Suite</p>
        <img class="room-image" src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="">
        <p class="room-details">Room Price: $327.24</p>
        <p class="room-details">Number of Beds: 1</p>
        <p class="room-details">Size of Bed: Queen</p>
      </div>
    </div>`)
    this.insertPastBookings(currentUser)
    this.insertFutureBookings(currentUser)
    this.insertTotalSpent(currentUser)
  },

  displayMangerPage(currentUser) {
    $('.static-container').text(' ')
    $('.static-container').append(`<div class="manager-top-box">
        <section class="hotel-overview-info">
          <p id="hotel-available-rooms">Rooms Available Today 12</p>
          <p id="hotel-revenue-today"></p>
          <p id="hotel-percentage-available"></p>
        </section>
      </div>
      <div class="manager-bottom-box">
        <section class="manager-bottom-sections" id="manager-bottom-1">
          <form class="guest-search-form">
            <input class="search-guest-input" type="text" name="" placeholder="Search Guest Name"value="Rhiannon Little">
            <button class="search-guest-button" type="button" name="button">Search For Guest</button>
            <p id='searched-guest-name'></p>
            <p id=searched-guest-spent></p>
          </form>
          <form class="manager-create-booking">
            <p>Create New Guest Booking Below</p>
            <input class="user-requested-booking-date" type="date" name="date" required></input>
            <button class='disabled booking-button' type="submit" name="button">Create Booking</button>
            <fieldset class='available-room-details'>
            </fieldset>
          </form>
        </section>
        <section class="manager-bottom-sections" id="manager-bottom-2">
          <p>Guests Past Bookings</p>
          <ul class="manager-search-past-bookings">
          </ul>
        </section>
        <section class="manager-bottom-sections" id="manager-bottom-3">
          <p>Guest Future Bookings</p>
          <ul class="manager-search-future-bookings">
          </ul>
        </section>
      </div>`)
    this.insertTotalRevenue(currentUser)
  },

  insertFutureBookings(currentUser) {
    $('#user-upcoming-bookings-list').text('')
    currentUser.futureBookings.forEach(booking => {
      $('#user-upcoming-bookings-list').append(`<li>${booking.date} in room ${booking.roomNumber}</li>`)
    })
  },

  insertPastBookings(currentUser) {
    currentUser.pastBookings.forEach(booking => {
      $('#user-past-bookings-list').append(`<li>${booking.date} in room ${booking.roomNumber}</li>`)
    })
  },

  insertTotalSpent(currentUser) {
    $('#total-user-spent').text(`You have spent a total of $${currentUser.totalSpent.toFixed(2)}`)
  },

  insertAvailableRooms(requestedDate, bookingData, roomsData) {
    $('.available-room-details').text('')
    let formatedDate = requestedDate.split('-').join('/')
    let bookingsPerDay = bookingData
      .filter(booking => booking.date === formatedDate)
      .map(room => room.roomNumber)
    let availableRooms = roomsData.filter(room => {
      if (!bookingsPerDay.includes(room.number)) {
        return room;
      }
    })
    availableRooms.forEach(room => {
      $('.available-room-details').append(`<input type="radio" id="${room.number}" name="available rooms" value="available room"><label for="This room is available">Room number ${room.number} is available, this room is a ${room.roomType}</label>`)
    })
  },

  insertTotalRevenue(currentUser) {
    $('#hotel-revenue-today').text(`Total Revenue Today is $${currentUser.dailyRevenue}`)
  },

  insertGuestFutureBookings(guestBookings) {
    $('.manager-search-future-bookings').text('')
    guestBookings.forEach(booking => {
      console.log(booking);
      $('.manager-search-future-bookings').append(`<li><button class='delete-booking-button' id='${booking.id}' type="button">Delete Booking</button>Room ${booking.roomNumber} on ${booking.date}</li>`)
    })
  },

  insertGuestPastBookings(guestBookings) {
    $('.manager-search-past-bookings').text('')
    guestBookings.forEach(booking => {
      $('.manager-search-past-bookings').append(`<li>Room ${booking.roomNumber} on ${booking.date}</li>`)
    })
  },

  insertGuestName(foundUser) {
    $('#searched-guest-name').text('')
    $('#searched-guest-name').append(`We found information for guest ${foundUser.name}`)
  },

  insertGuestTotalSpent(foundUser, bookingData, roomsData) {
    let allUserBookings = bookingData.filter(booking => booking.userID === foundUser.id)
    let currentUserTotal = allUserBookings.reduce((acc, userBooking) => {
      let roomValue = roomsData.find(room => room.number === userBooking.roomNumber).costPerNight
      acc += roomValue
      return acc;
    }, 0).toFixed(2)
    $('#searched-guest-spent').text('')
    $('#searched-guest-spent').append(`Guest has spent $${currentUserTotal}`)
  },

  displayTotalDailyBooked(bookingData, todayDate, roomsData) {
    $('#hotel-available-rooms').text('')
    let bookingsPerDay = bookingData
      .filter(booking => booking.date === todayDate)
      .map(room => room.roomNumber)
    let availableRooms = roomsData.filter(room => {
      if (!bookingsPerDay.includes(room.number)) {
        return room;
      }
    })
    $('#hotel-available-rooms').append(`Hotel has ${availableRooms.length} room available today`)
  },

  displayPercentageRoomsAvailable(bookingData, todayDate, roomsData) {
    $('#hotel-percentage-available').text('')
    let bookingsPerDay = bookingData
      .filter(booking => booking.date === todayDate)
      .map(room => room.roomNumber)
    let availableRooms = roomsData.filter(room => {
      if (!bookingsPerDay.includes(room.number)) {
        return room;
      }
    })
    let percentage = availableRooms.length*100/roomsData.length
    $('#hotel-percentage-available').append(`Hotel has ${percentage}% room availability today`)
  },

  displayUpdatedFutureGuestBookings(data) {
    $('.manager-search-future-bookings').append(`<li><button type="button">Delete Booking</button>Room ${data.roomNumber} on ${data.date}</li>`)
  },

  deleteGuestBooking() {

  }

}

export default domUpdates;
