class Fetcher {
  constructor() {}

  fetchUserData() {
    return fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
      .then(response => response.json())
  }

  fetchBookingsData() {
    return fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
      .then(response => response.json())
  }

  fetchRoomsData() {
    return fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
      .then(response => response.json())
  }

  postBookingsData(userBookingRequest) {
    return fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: userBookingRequest.userId,
        date: userBookingRequest.date,
        roomNumber: userBookingRequest.roomNumber,
      })
    })
      .then(response => {return response.json()})
      .catch(err => console.log("error", err.message))
  }

  deleteReservation(targetId) {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': targetId
      })
    })
      .then(response => response.json())
      .then(data => console.log("success", data))
      .catch(err => console.log("error", err.message))
  }

}

export default Fetcher;
