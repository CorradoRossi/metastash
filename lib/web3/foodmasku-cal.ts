import axios from 'axios';

const api = axios.create({
  headers: {
    Accept: 'application/json'
  },
  timeout: 20000
});

//export const fetchCalData = async () => {
//  try {
//    const url =
//      'https://clients6.google.com/calendar/v3/calendars/q425rnfllqjhnadfj5lei540os@group.calendar.google.com/events?calendarId=q425rnfllqjhnadfj5lei540os%40group.calendar.google.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2021-06-27T00%3A00%3A00-04%3A00&timeMax=2021-08-01T00%3A00%3A00-04%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';
//    const data = await api.get(url);
//    return data;
//  } catch (error) {
//    console.log('Error getting cal data', error);
//    throw error;
//  }
//};

const fetchCalData = async () => {
  const url =
    'https://clients6.google.com/calendar/v3/calendars/q425rnfllqjhnadfj5lei540os@group.calendar.google.com/events?calendarId=q425rnfllqjhnadfj5lei540os%40group.calendar.google.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2021-06-27T00%3A00%3A00-04%3A00&timeMax=2021-08-01T00%3A00%3A00-04%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';
  const data = await api.get(url).then(res => res.data);
  return data;
};

const CalData = () => fetchCalData();
export default CalData;
