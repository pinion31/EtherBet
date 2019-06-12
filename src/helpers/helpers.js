export const formatEvents = ({events}=[], extractFormattedDate) => {
  const allEvents = {};
  const eventsCopy = Array.from(events);
  eventsCopy.forEach(event => {
    const {event_date: eventDate, sport_id: sportId } = event;
    const formattedDate =  extractFormattedDate(eventDate);
    if (!allEvents[formattedDate]) allEvents[formattedDate] = {};
    allEvents[formattedDate] [sportId] ?
      allEvents[formattedDate] [sportId].push(event) :
      allEvents[formattedDate] [sportId] = [event];
  });
  return allEvents;
}

export const extractFormattedDate = (date) => {
    const newDate = new Date(date);
    const dayOfMonth = (newDate.getDate()).toString().length == 1 ? `0${newDate.getDate()}`: newDate.getDate();
    const month = (newDate.getMonth() + 1).toString().length == 1 ? `0${newDate.getMonth() + 1}`: newDate.getMonth() + 1;
    console.log('newDate.getMonth() + 1', newDate.getMonth() + 1);
    console.log('month', month);
    return `${newDate.getFullYear()}-${month}-${dayOfMonth}`;
};

// compiles events of diff types into one array
export const compileEvents = (events=[]) => {
  const compileEvents = [];
  Object.keys(events).forEach((key) => compileEvents.push(...events[key]));
  return compileEvents
};

export const validateFieldsAreNotBlank = (data, errorCb) => {
  const validate = Object.keys(data).every(key => data[key].length > 0);
  if (!validate) errorCb();
  return validate;
}

export const validateFieldsMatch = (field1, field2, errorCb) => {
  const match = field1 === field2;
  if (!match) errorCb();
  return match;
};

