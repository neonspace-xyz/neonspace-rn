import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import 'moment-duration-format';
import { Alert } from "react-native";

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
  const isSeconds = timestamp.toString().length === 10;
  const date = isSeconds ? moment(timestamp) : moment.unix(timestamp);
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

export const formatEventTime = (timestamp) => {
  const formattedDate = moment(timestamp).format("MMMM Do YYYY");
  return formattedDate;
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

export const shortenAddress = (address, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
};

export const processUserVerifiedList = (users) => {
  let names = '-';
  let images = [];
  try {
    let _verifiedNameArr = [];
    for (const user of users) {
      _verifiedNameArr.push(`${truncateString(user.screen_name, 15)}`);
      images.push(user.profile_image);
      if (_verifiedNameArr.length == 2) {
        break;
      }
    }
    if (users?.length > 2) {
      let sisa = userInfo.verified.length - 2;
      _verifiedNameArr.push(`and ${sisa} other${sisa > 1 && 's'}`);
    }

    if (_verifiedNameArr.length > 0) {
      names = _verifiedNameArr.join(",");
    }
  } catch (error) {
    console.error("processUserVerifiedList", error);
  } finally {
    return { names, images };
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
    console.log("logout-called")
    await AsyncStorage.removeItem('usersession');
    Alert.alert(
      'Session Expired',
      'Your session has expired. Please log in again.',
      [{
        text: 'OK', onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
          });
        }
      }]
    );
  } catch (error) {
    console.log("logout-error", error)
  }
}