import { expect } from 'chai';
import Manager from '../src/manager';

describe('Manager', function() {
  let manager;
  let user
  let todayDate;
  let bookingData;
  let roomsData

  beforeEach(function() {

    manager = new Manager()

    user = {
      name: "Tony Armstrong",
      id: 10,
      futureBookings: [],
      pastBookings: [],
      totalSpent: 0
    };
    todayDate = '2020/04/20'

    bookingData = [{"id":"5fwrgu4i7k55hl6sz","userID":9,"date":"2020/02/04","roomNumber":15,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t5","userID":10,"date":"2020/07/24","roomNumber":24,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t6","userID":13,"date":"2020/01/10","roomNumber":12,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t7","userID":10,"date":"2020/02/16","roomNumber":7,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2020/04/22","roomNumber":12,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t9","userID":10,"date":"2020/04/20","roomNumber":14,"roomServiceCharges":[]}]

    roomsData = [{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
      {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
      {"number":24,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
      {"number":14,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
      {"number":7,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
      {"number":14,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
      {"number":13,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":231.46},
      {"number":8,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":261.26},
      {"number":12,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":200.39}]
    });

    it('should be a function', function() {
      expect(Manager).to.be.a('function');
    })

    it('should be an instance of Manager', function() {
      expect(manager).to.be.an.instanceof(Manager);
    })

    it('should be able to get daily revenue', function() {
      manager.getDailyRevenue(bookingData, todayDate, roomsData)
      expect(manager.dailyRevenue).to.equal('429.44')
    })

    it('should be able to get guest future bookings', function() {
      manager.getUserFutureBookings(user, todayDate, bookingData)
      expect(manager.getUserFutureBookings(user, todayDate, bookingData)).to.deep.equal([{
        id: '5fwrgu4i7k55hl6t5',
        userID: 10,
        date: '2020/07/24',
        roomNumber: 24,
        roomServiceCharges: []
      }])
    })

    it('should be able to get guest past bookings', function() {
      manager.getGuestPastBookings(user, todayDate, bookingData)
      expect(manager.getGuestPastBookings(user, todayDate, bookingData)).to.deep.equal([{
        id: '5fwrgu4i7k55hl6t7',
        userID: 10,
        date: '2020/02/16',
        roomNumber: 7,
        roomServiceCharges: []
      }])
    })

  });
