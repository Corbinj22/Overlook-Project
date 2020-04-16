class User {
  constuctor(name, id) {
    this.name = name;
    this.id = id;
    this.bookings = this.getFutureBookings(id);
    this.pastBookings = this.getPastBookings(id);
    this.totalSpent = this.getTotalSpent(id);
  }
  getFutureBookings(id) {
    //iteratre through bookings data and match all bookings by id from today on
  }

  getPastBookings(id) {
    //iteratre through bookings data and match all yesterady and beyond
  }

  getTotalSpent() {
    //itterate through all bookings match value of rooms and return the value
  }
}

export default User;
