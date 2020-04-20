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
        <input id="user-requested-booking-date" type="date" name="date" required></input>
        <button class='disabled' id="booking-button" type="submit" name="button">Create Booking</button>
        <fieldset id='available-room-details'>
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
          <p id="hotel-glance-description">Rooms Available Today 12</p>
          <p id="hotel-revenue-today"></p>
          <p id="hotel-percentage-available">45% of rooms are booked today</p>
        </section>
      </div>
      <div class="manager-bottom-box">
        <section class="manager-bottom-sections" id="manager-bottom-1">
          <form class="guest-search-form">
            <input class="search-guest-input" type="text" name="" placeholder="Search Guest Name"value="Antone Olson">
            <button class="search-guest-button" type="button" name="button">Search For Guest</button>
            <p id='searched-guest-name'>Justin Corbin</p>
            <p id=searched-guest-spent>Guest has spent $234.00</p>
          </form>
          <form class="manager-create-booking">
            <p>Create New Booking Below</p>
            <input id="manager-requested-booking-date" type="date" name="date" required></input>
            <button class='disabled' id="manager-booking-button" type="submit" name="button">Create Booking</button>
            <fieldset id='available-rooms'>
            </fieldset>
          </form>
        </section>
        <section class="manager-bottom-sections" id="manager-bottom-2">
          <p>Guests Past Bookings</p>
          <ul class="manager-search-past-bookings">
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
            <li>SKJDHFLSKJHDFLSKDJFHSLDKJFH</li>
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
    $('#available-room-details').text('')
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
      $('#available-room-details').append(`<input type="radio" id="${room.number}" name="available rooms" value="available room"><label for="This room is available">Room number ${room.number} is available, this room is a ${room.roomType}</label>`)
    })
  },

  insertTotalRevenue(currentUser) {
    $('#hotel-revenue-today').text(`Total Revenue Today is $${currentUser.dailyRevenue}`)
  },

  insertGuestFutureBookings(guestBookings) {
    $('.manager-search-future-bookings').text('')
    guestBookings.forEach(booking => {
      $('.manager-search-future-bookings').append(`Room <li>${booking.roomNumber} on ${booking.date}</li>`)
    })
    console.log(guestBookings.length);
  }

}

export default domUpdates;
