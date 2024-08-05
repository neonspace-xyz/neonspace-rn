import moment from "moment";
import 'moment-duration-format';

export const getRandomNumber = (min = 10, max = 20) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomTimestamp = () => {
  const now = moment();
  const twoDaysAgo = now.clone().subtract(2, 'days');
  const randomTimestamp = twoDaysAgo.valueOf() + Math.floor(Math.random() * (now.valueOf() - twoDaysAgo.valueOf() + 1));
  return moment(randomTimestamp).toDate(); // Converts back to a Date object if needed
}

export const formatPostDuration = (duration) => {
  // return moment.duration(duration).format('Y [Y], M [M], w [w], d [d], h [h], m [m], s [s]', {
  //   trim: 'both'
  // });
  if (duration.asYears() >= 1) {
    return Math.floor(duration.asYears()) + 'Y';
  } else if (duration.asMonths() >= 1) {
    return Math.floor(duration.asMonths()) + 'M';
  } else if (duration.asWeeks() >= 1) {
    return Math.floor(duration.asWeeks()) + 'w';
  } else if (duration.asDays() >= 1) {
    return Math.floor(duration.asDays()) + 'd';
  } else if (duration.asHours() >= 1) {
    return Math.floor(duration.asHours()) + 'h';
  } else if (duration.asMinutes() >= 1) {
    return Math.floor(duration.asMinutes()) + 'm';
  } else {
    return Math.floor(duration.asSeconds()) + 's';
  }
}

export const formatPostTimestamp = (timestamp) => {
  const timeFormat = moment(timestamp).format('h:mm A');  // 8:30 PM
  const dateFormat = moment(timestamp).format('DD/MM/YYYY'); // 26/11/2023

  return { timeFormat, dateFormat };
}

export const getFormattedPostTimestamp = (timestamp) => {
  try {
    console.log("timestamp", timestamp)
    const now = moment();
    const duration = moment.duration(now.diff(moment(timestamp)));
    console.log("duration", duration)
    return formatPostDuration(duration);
  } catch (e) {
    console.error("error-getFormattedPostTimestamp", e?.message);
    return "";
  }
}
