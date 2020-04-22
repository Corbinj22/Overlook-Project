import { expect } from 'chai';
import User from '../src/User';

describe('User', function() {
  let user;
  let bookingData;
  let roomsData

  beforeEach(function() {
    user = new User({
      name: "Tony Armstrong",
      id: 10,
      futureBookings: [],
      pastBookings: [],
      totalSpent: 0
    });

    bookingData = [ {"id": "5fwrgu4i7k55hl6sz", "userID": 9, "date": "2020/02/04", "roomNumber": 15, "roomServiceCharges": []},
      {"id": "5fwrgu4i7k55hl6t5", "userID": 10, "date": "2020/07/24", "roomNumber": 24, "roomServiceCharges": []},
      {"id": "5fwrgu4i7k55hl6t6", "userID": 13, "date": "2020/01/10", "roomNumber": 12, "roomServiceCharges": []},
      {"id": "5fwrgu4i7k55hl6t7", "userID": 10, "date": "2020/02/16", "roomNumber": 7, "roomServiceCharges": []},
      {"id": "5fwrgu4i7k55hl6t8", "userID": 1, "date": "2020/02/05", "roomNumber": 12, "roomServiceCharges": []},
      {"id": "5fwrgu4i7k55hl6t9", "userID": 10, "date": "2020/02/14", "roomNumber": 14, "roomServiceCharges": []}]

    roomsData = [ {"number": 1, "roomType": "residential suite", "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 358.4},
      {"number": 2, "roomType": "suite", "bidet": false, "bedSize": "full", "numBeds": 2, "costPerNight": 477.38},
      {"number": 24, "roomType": "single room", "bidet": false, "bedSize": "king", "numBeds": 1, "costPerNight": 491.14},
      {"number": 14, "roomType": "single room", "bidet": false, "bedSize": "queen", "numBeds": 1, "costPerNight": 429.44},
      {"number": 7, "roomType": "single room", "bidet": true, "bedSize": "queen", "numBeds": 2, "costPerNight": 340.17},
      {"number": 14, "roomType": "junior suite", "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 397.02},
      {"number": 13, "roomType": "single room", "bidet": false, "bedSize": "queen", "numBeds": 2, "costPerNight": 231.46},
      {"number": 8, "roomType": "junior suite", "bidet": false, "bedSize": "king", "numBeds": 1, "costPerNight": 261.26},
      {"number": 12, "roomType": "single room", "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 200.39}]
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should take a user data object', function() {
    expect(user.id).to.equal(10);
    expect(user.name).to.equal("Tony Armstrong");
  })

  it('should be able to get future bookings', function() {
    user.getFutureBookings(bookingData)
    expect(user.futureBookings).to.deep.include({
      id: '5fwrgu4i7k55hl6t5',
      userID: 10,
      date: '2020/07/24',
      roomNumber: 24,
      roomServiceCharges: []
    })
  })

  it('should be able to get past bookings', function() {
    user.getFutureBookings(bookingData)
    expect(user.futureBookings).to.deep.include({
      id: '5fwrgu4i7k55hl6t5',
      userID: 10,
      date: '2020/07/24',
      roomNumber: 24,
      roomServiceCharges: []
    })
  })

  it('should be able to get total spent', function() {
    user.getTotalSpent(bookingData, roomsData)
    expect(user.totalSpent).to.equal(1260.75)
  })

  it('should be able to make a new booking', function() {
    user.createNewBooking('7', '2020-04-22', 'jv7bbwmtf5800z0urx')
    expect(user.futureBookings).to.deep.include({
      id: 'jv7bbwmtf5800z0urx',
      userId: 10,
      date: '2020-04-22',
      roomNumber: 7,
      roomServiceCharges: []
    })
  })

});
