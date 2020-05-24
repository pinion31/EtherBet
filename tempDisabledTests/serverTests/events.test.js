import chai from "chai";
import chaiHttp from "chai-http";
import moment from "moment";
import server from "../../index/index.js";
// import Sports from '../../index/models/Sport';
// import sports from '../responses/sports.json';
import sportsFromDb from "../responses/sportsFromDb.json";
import events from "../responses/events.json";
import betsToSettle from "../responses/betsToSettle.json";
import eventsForToday from "../responses/eventsForToday.json";
import Bet from "../../index/models/Bet";
import Event from "../../index/models/Event";

chai.use(chaiHttp);
Date.now = jest.fn(() => new Date(Date.UTC(2019, 6, 22, 4)).valueOf());

beforeEach((done) => {
  Event.destroy({ truncate: true, cascade: false })
    .then(() => Bet.destroy({ truncate: true, cascade: false }))
    .then(() => Promise.all(events.map((event) => Event.create(event))))
    .then(() => Promise.all(betsToSettle.map((bet) => Bet.create(bet))))
    .then(() => done())
    .catch(async (e) => {
      done();
      console.log("Try again. Error setting up DB in bets.test.js.", e);
    });
});

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          received
        )} to contain object ${this.utils.printExpected(argument)}`,
      pass: false,
    };
  },
});

test("it retrieves sports", (done) => {
  chai
    .request(server)
    .get("/events/get-sports")
    .end((err, res) => {
      sportsFromDb.forEach((sport, key) => {
        delete res.body[key].updatedAt;
        delete res.body[key].createdAt;
        delete res.body[key].lastQueryDate;
        sport.enabled = sport.enabled == "True";
        return sport;
      });
      expect(res.body).toContainObject({
        enabled: false,
        id: 8,
        sportId: 8,
        sportName: "WNBA",
      });
      expect(res.body).toContainObject({
        id: 6,
        sportId: 6,
        sportName: "NHL",
        enabled: true,
      });
      expect(res.body).toContainObject({
        id: 2,
        sportId: 5,
        sportName: "NCAA Men's Basketball",
        enabled: true,
      });
      expect(res.body).toContainObject({
        id: 3,
        sportId: 4,
        sportName: "NBA",
        enabled: true,
      });
      expect(res.body).toContainObject({
        id: 9,
        sportId: 9,
        sportName: "CFL",
        enabled: false,
      });
      expect(res.body).toContainObject({
        id: 4,
        sportId: 1,
        sportName: "NCAA Football",
        enabled: true,
      });
      expect(res.body).toContainObject({
        id: 1,
        sportId: 2,
        sportName: "NFL",
        enabled: true,
      });
      expect(res.body).toContainObject({
        id: 7,
        sportId: 7,
        sportName: "UFC/MMA",
        enabled: false,
      });
      expect(res.body).toContainObject({
        id: 7,
        sportId: 7,
        sportName: "UFC/MMA",
        enabled: false,
      });
      expect(res.body).toContainObject({
        id: 5,
        sportId: 3,
        sportName: "MLB",
        enabled: true,
      });
      done();
    });
});

test("it retrieves events for the present day", (done) => {
  chai
    .request(server)
    .get("/events/events-for-today")
    .end((err, res) => {
      res.body.forEach((event, key) => {
        delete res.body[key].updatedAt;
        return event;
      });

      expect(res.body.length).toBe(5);
      expect(res.body).toContainObject(eventsForToday[0]);
      expect(res.body).toContainObject(eventsForToday[1]);
      expect(res.body).toContainObject(eventsForToday[2]);
      expect(res.body).toContainObject(eventsForToday[3]);
      expect(res.body).toContainObject(eventsForToday[4]);
      done();
    });
});
