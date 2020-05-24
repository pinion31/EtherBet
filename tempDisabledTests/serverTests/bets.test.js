import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index/index.js";
import users from "../responses/users.json";
import User from "../../index/models/User";
import Bet from "../../index/models/Bet";
import betsToSettle from "../responses/betsToSettle.json";
import sampleBets from "../responses/moreSampleBets.json";

chai.use(chaiHttp);

beforeEach((done) => {
  User.destroy({ truncate: true, cascade: false })
    .then(() => Bet.destroy({ truncate: true, cascade: false }))
    .then(() => Promise.all(users.map((user) => User.create(user))))
    .then(() => Promise.all(betsToSettle.map((bet) => Bet.create(bet))))
    .then(() => done())
    .catch(async (e) => {
      done();
      console.log("Try again. Error setting up DB in bets.test.js.", e);
    });
});

test("it successfully proposes a bet", (done) => {
  chai
    .request(server)
    .post("/bets/propose-bet")
    .send({
      receiver: "lucy",
      wager: 101,
      teamSelectedToWin: "Texas Rangers",
      senderId: 1,
      senderLogin: "chris",
      eventDate: "2019-05-12 14:30:00-05",
      sportId: 4,
      eventId: "5c25642185ec4bd28e56e3e975e65c71",
      teamOne: "Texas Rangers",
      teamTwo: "New York Yankees",
    })
    .end((err, res) => {
      const {
        archived,
        hidden,
        id,
        sportId,
        eventId,
        teamSelectedToWin,
        dateOfEvent,
        teamOne,
        teamTwo,
        status,
        betCreator,
        betCreatorHandicap,
        betCreatorLogin,
        betReceiver,
        betReceiverLogin,
        betReceiverHandicap,
        actualWinner,
        wager,
      } = res.body;

      expect(archived).toBe(false);
      expect(hidden).toBe(false);
      expect(id).toBeDefined();
      expect(sportId).toBe(4);
      expect(eventId).toBe("5c25642185ec4bd28e56e3e975e65c71");
      expect(teamSelectedToWin).toBe("Texas Rangers");
      expect(dateOfEvent).toBe("2019-05-12T19:30:00.000Z");
      expect(teamOne).toBe("Texas Rangers");
      expect(teamTwo).toBe("New York Yankees");
      expect(status).toBe("OFFER PENDING");
      expect(betCreator).toBe(1);
      expect(betCreatorHandicap).toBe(0);
      expect(betCreatorLogin).toBe("chris");
      expect(betReceiver).toBe(2);
      expect(betReceiverLogin).toBe("lucy");
      expect(betReceiverHandicap).toBe(0);
      expect(actualWinner).toBe("");
      expect(wager).toBe(101);
      done();
    });
});

test("it returns error if user does not exist", (done) => {
  chai
    .request(server)
    .post("/bets/propose-bet")
    .send({
      receiver: "invalid user",
      wager: 101,
      teamSelectedToWin: "Texas Rangers",
      senderId: 10,
      senderLogin: "lucy",
      eventDate: "2019-05-12 14:30:00-05",
      sportId: 4,
      eventId: "5c25642185ec4bd28e56e3e975e65c71",
      teamOne: "Texas Rangers",
      teamTwo: "New York Yankees",
    })
    .end((err, res) => {
      const {
        archived,
        hidden,
        id,
        sportId,
        eventId,
        teamSelectedToWin,
        dateOfEvent,
        teamOne,
        teamTwo,
        status,
        betCreator,
        betCreatorHandicap,
        betCreatorLogin,
        betReceiver,
        betReceiverLogin,
        betReceiverHandicap,
        actualWinner,
        wager,
      } = res.body;
      expect(res.body).toEqual({ error: "User not found" });
      expect(archived).toBeUndefined();
      expect(hidden).toBeUndefined();
      expect(id).toBeUndefined();
      expect(sportId).toBeUndefined();
      expect(eventId).toBeUndefined();
      expect(teamSelectedToWin).toBeUndefined();
      expect(dateOfEvent).toBeUndefined();
      expect(teamOne).toBeUndefined();
      expect(teamTwo).toBeUndefined();
      expect(status).toBeUndefined();
      expect(betCreator).toBeUndefined();
      expect(betCreatorHandicap).toBeUndefined();
      expect(betCreatorLogin).toBeUndefined();
      expect(betReceiver).toBeUndefined();
      expect(betReceiverLogin).toBeUndefined();
      expect(betReceiverHandicap).toBeUndefined();
      expect(actualWinner).toBeUndefined();
      expect(wager).toBeUndefined();
      done();
    });
});

test("it retrieves bet for a user", (done) => {
  chai
    .request(server)
    .post("/bets/get-bets")
    .send({
      userId: 1,
    })
    .end((err, res) => {
      const resultToCompare = [{ ...res.body[0] }, { ...res.body[1] }];
      resultToCompare[0].updatedAt = betsToSettle[0].updatedAt;
      resultToCompare[1].updatedAt = betsToSettle[1].updatedAt;
      expect(resultToCompare).toEqual(betsToSettle);
      done();
    });
});

test("it retrieves no bets for a user with no bets", (done) => {
  chai
    .request(server)
    .post("/bets/get-bets")
    .send({
      userId: 101,
    })
    .end((err, res) => {
      expect(res.body.length).toBe(0);
      expect(res.body).toEqual([]);
      done();
    });
});

test("it updates a bet status", (done) => {
  chai
    .request(server)
    .post("/bets/set-bet-status")
    .send({
      betId: 8,
      newStatus: "SETTLED",
    })
    .end((err, res) => {
      expect(res.body).toEqual({ status: "SETTLED" });
      done();
    });
});
