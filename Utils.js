import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import 'moment-duration-format';

export const getRandomNumber = (min = 10, max = 20) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomTimestamp = (amount) => {
  const now = moment();
  const twoDaysAgo = now.clone().subtract(amount, 'days');
  const randomTimestamp = twoDaysAgo.valueOf() + Math.floor(Math.random() * (now.valueOf() - twoDaysAgo.valueOf() + 1));
  return moment(randomTimestamp).toDate().toISOString(); // Converts back to a Date object if needed
}

export const convertTimestamp = (timestamp) => {
  const date = moment.unix(timestamp).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return date;
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

export const formatChatListTime = (timestamp) => {
  const date = moment(timestamp);
  const now = moment();
  const oneWeekAgo = now.clone().subtract(7, 'days');

  if (date.isAfter(oneWeekAgo)) {
    // If the date is within the last week, show the day of the week
    return date.format('ddd');
  } else {
    // If the date is more than a week old, show the full date in DD/MM/YYYY format
    return date.format('DD/MM/YYYY');
  }
}

export const formatPostTimestamp = (timestamp) => {
  const timeFormat = moment(timestamp).format('h:mm A');  // 8:30 PM
  const dateFormat = moment(timestamp).format('DD/MM/YYYY'); // 26/11/2023

  return { timeFormat, dateFormat };
}

export const getFormattedPostTimestamp = (timestamp) => {
  try {
    const now = moment();
    const duration = moment.duration(now.diff(moment(timestamp)));
    return formatPostDuration(duration);
  } catch (e) {
    console.error("error-getFormattedPostTimestamp", e?.message);
    return "";
  }
}

export const getSession = (session) => {
  const usersession = JSON.parse(session);
  const token = usersession.jwt_token;
  const userInfo = usersession.user_info;
  return { usersession, token, userInfo };
}

export const logout = async (navigation) => {
  try {
    console.log("logout");
    await AsyncStorage.removeItem('usersession');
    navigation.replace("Login");
  } catch (error) {
    console.log("logout-error", error)
  }
}