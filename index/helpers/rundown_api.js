/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import request from 'request-promise-native';
import Sport from '../models/Sport';
import Event from '../models/Event';
import logger from '../logger';

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function getEventforDateforSport(date, sportId) {
  const options = {
    uri: `https://therundown-therundown-v1.p.rapidapi.com/sports/${sportId}/events/${date}?include=scores`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'therundown-therundown-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    },
    json: true, // Automatically parses the JSON string in the response
  };
  // return all events for this sport for this date
  return request(options).then(({ events }) => {
    logger.info(`Raw Event Retrieval from Rundown API: ${JSON.stringify(events)}`);
    return events;
  });
}

// format event json for front-end
export function formatEvent({
  sport_id, event_id, event_date, score, teams,
}) {
  const {
    event_status,
    score_away,
    score_home,
    winner_away,
    winner_home,
    venue_name,
    venue_location,
  } = score;

  const [teamOne, teamTwo] = teams;
  return {
    sportId: sport_id,
    eventId: event_id,
    eventDate: event_date,
    eventStatus: event_status,
    scoreAway: score_away,
    scoreHome: score_home,
    winnerAway: winner_away,
    winnerHome: winner_home,
    venueName: venue_name,
    venueLocation: venue_location,
    teamOneId: teamOne.team_id,
    teamOneName: teamOne.name,
    teamOneIsAway: teamOne.is_away,
    teamOneIsHome: teamOne.is_home,
    teamOneHandicap: 0,
    teamTwoId: teamTwo.team_id,
    teamTwoName: teamTwo.name,
    teamTwoIsAway: teamTwo.is_away,
    teamTwoIsHome: teamTwo.is_home,
    teamTwoHandicap: 0,
  };
}

export function saveEventToDB(event) {
  const {
    sportId,
    eventId,
    eventDate,
    eventStatus,
    scoreAway,
    scoreHome,
    winnerAway,
    winnerHome,
    venueName,
    venueLocation,
    teamOneId,
    teamOneName,
    teamOneIsAway,
    teamOneIsHome,
    teamOneHandicap,
    teamTwoId,
    teamTwoName,
    teamTwoIsAway,
    teamTwoIsHome,
    teamTwoHandicap,
  } = event;

  return Event.findOne({ where: { eventId } })
    .then((existingEvent) => {
      if (existingEvent) return existingEvent.update(event);
      return Event.create({
        sportId,
        eventId,
        eventDate,
        eventStatus,
        scoreAway,
        scoreHome,
        winnerAway,
        winnerHome,
        venueName,
        venueLocation,
        teamOneId,
        teamOneName,
        teamOneIsAway,
        teamOneIsHome,
        teamOneHandicap,
        teamTwoId,
        teamTwoName,
        teamTwoIsAway,
        teamTwoIsHome,
        teamTwoHandicap,
        betCount: 0,
      });
    });
}
export function getSportsFromDB() {
  return Sport.findAll({ raw: true });
}

export function pullEventAndSave(date, sportId) {
  return getEventforDateforSport(date, sportId)
    .then(data => data.filter(({ score }) => score.event_status === 'STATUS_SCHEDULED'))
    .then(data => data.map(formatEvent))
    .then(formattedEvents => Promise.all(formattedEvents.map(saveEventToDB)));
}

export const updateSportQueryDate = id => Sport.findOne({ where: { id } })
  .then((sport) => {
    if (sport) {
      // eslint-disable-next-line no-param-reassign
      sport.lastQueryDate = new Date(Date.now());
      sport.save();
    }
    throw Error('Sport does not exist');
  }).catch(e => e.message);

// TODO: add error handling
export function getEventsforFutureDays(numOfDays) {
  return getSportsFromDB()
    .then((sports) => {
      let allSportsPromises = [];
      sports.forEach(({ sportId, enabled }) => {
        if (!enabled) return; // only pull sports that are enabled
        updateSportQueryDate(sportId);
        const todaysDate = new Date(Date.now());
        const promisesForThisSport = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < numOfDays; i++) {
          const currentDateToRetrieve = todaysDate.addDays(i).toISOString().substring(0, 10);
          promisesForThisSport.push(pullEventAndSave(currentDateToRetrieve, sportId));
        }
        allSportsPromises = [...allSportsPromises, ...promisesForThisSport];
      });
      return Promise.all(allSportsPromises);
    });
}
