import { expect } from 'chai';
import User from '../src/User';


describe('User', function() {
  let user;

  beforeEach(function() {
    user = new User({
      name: "Tony Armstrong",
      id: 10,
      futureBookings: [],
      pastBookings: [{id: "5fwrgu4i7k55hl6ua", userID: 10, date: "2020/01/30", roomNumber: 12, roomServiceCharges: Array(0)}, {id: "5fwrgu4i7k55hl6v2", userID: 10, date: "2020/02/27", roomNumber: 23, roomServiceCharges: Array(0)}],
      totalSpent: 5368.26
    });
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
});

});
