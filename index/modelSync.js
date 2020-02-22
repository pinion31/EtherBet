const Event = require('./models/Event');
const Bet = require('./models/Bet');
const User = require('./models/User');
const Sport = require('./models/Sport');

Bet.sync();
Event.sync();
User.sync();
Sport.sync();

/*
const sports = {
  sports: [
    {
      sport_id: 1,
      sport_name: 'NCAA Football',
    },
    {
      sport_id: 2,
      sport_name: 'NFL',
    },
    {
      sport_id: 3,
      sport_name: 'MLB',
    },
    {
      sport_id: 4,
      sport_name: 'NBA',
    },
    {
      sport_id: 5,
      sport_name: "NCAA Men's Basketball",
    },
    {
      sport_id: 6,
      sport_name: 'NHL',
    },
    {
      sport_id: 7,
      sport_name: 'UFC/MMA',
    },
    {
      sport_id: 8,
      sport_name: 'WNBA',
    },
    {
      sport_id: 9,
      sport_name: 'CFL',
    },
  ],
};

function insertAllSports() {
  sports.sports.forEach((sport) => {
    Sport.create({
      sportId: sport.sport_id,
      sportName: sport.sport_name,
    });
  });
}

insertAllSports();
*/
