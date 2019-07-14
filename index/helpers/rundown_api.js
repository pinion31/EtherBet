/* eslint-disable import/prefer-default-export */
import request from 'request-promise-native';


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
  return request(options);
}

export function getEventsforFutureDays(arrayOfSportIds) {

}
