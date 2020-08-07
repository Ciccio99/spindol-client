import moment from 'moment-timezone';
import axios from 'loaders/axios';
import ErrorHandler from 'utils/ErrorHandler';

const ROUTE = '/dailyReminders';

const getEmailDueTime = () => {
  const dateTime = moment().startOf('day').add(11, 'hours').utc();
  const dueTime = (dateTime.hours() * 60) + dateTime.minutes();
  return dueTime;
};

export const getCurrentDailyReminder = async () => {
  try {
    const { data } = await axios.get(ROUTE);
    if (data.length) {
      return data[0];
    }
    return {};
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const updateDailyEmailReminderById = async (id, dto) => {
  try {
    if (!id) {
      throw new Error('Must provider an id');
    }
    const { data } = await axios.patch(`${ROUTE}/${id}`, {
      ...dto,
      _id: id,
      dueTime: getEmailDueTime(),
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const insertDailyEmailReminder = async () => {
  try {
    const { data } = await axios.post(ROUTE, {
      deliveryType: 'email',
      dueTime: getEmailDueTime(),
      enabled: true,
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};
