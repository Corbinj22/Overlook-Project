import $ from 'jquery'

const domUpdates = {
  displayUserPage(currentUser) {
    $('.static-container').text(' ')

    $('.static-container').append(`<div class="welcome-message-box">
      <p id="user-welcome-message">Thank you for choosing to stay with Kebahagiaan Jungle Resort.
        You will find your personal information below</p>
    </div>
    <div class="user-important-info">
      <div class="user-interaction-box">
        <p id="booking-instructions">Please choose a date to create a new booking</p>
        <input id="user-requested-booking-date"type="date" placeholder="dd/mm/yyyy">
        <button id="create-booking-button" type="button" name="button">Create Booking</button>
        <div class="room-selector-box">
          <span><input type="radio" class="room-button-selector" id="residential-suite-selector" name="residential-suite" value="residential-suite"><label>Residential Suite</label></span>
          <span><input type="radio" class="room-button-selector" id="single-room-selector" name="ingle-room" value="ingle-room"><label>Single Room</label></span>
          <span><input type="radio" class="room-button-selector" id="junior-suite-selector" name="junior-suite" value="junior-suite"><label>Junior Suite</label></span>
          <span><input type="radio" class="room-button-selector" id="suite-selector" name="suite" value="suite"><label>Suite</label></span>
        </div>
      </div>
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
    this.insertFutureBookings(currentUser)
    this.inserPastBookings(currentUser)
  },

  insertFutureBookings(currentUser) {
    currentUser.futureBookings.forEach(booking => {
      $('#user-upcoming-bookings-list').append(`<li>${booking}</li>`)
    })
  },

  inserPastBookings(currentUser) {
    currentUser.pastBookings.forEach(booking => {
      $('#user-past-bookings-list').append(`<li>${booking.date} in room ${booking.roomNumber}</li>`)
    })
  }

}

export default domUpdates;
