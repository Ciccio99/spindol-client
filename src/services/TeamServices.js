import moment from 'moment-timezone';
import ErrorHandler from 'utils/ErrorHandler';
import axios from 'loaders/axios';
import SleepSummaryServices from 'services/SleepSummaryServices';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const getTeamDashboard = async () => {
  try {
    const { data } = await axios.get('/users', {
      params: {
        role: 'admin',
      },
    });
    const weekStart = moment().startOf('week').format('YYYY-MM-DD');
    const weekEnd = moment().endOf('week').format('YYYY-MM-DD');
    const teamData = {};
    const requests = data.map((user) => {
      teamData[user._id] = {
        user,
      };
      return SleepSummaryServices.getSleepTeamMember(user.id, weekStart, weekEnd);
    });
    const responses = await Promise.all(requests);
    responses.forEach((sleepArray) => {
      if (sleepArray.length) {
        const userId = sleepArray[0].owner;
        teamData[userId].sleepAverage = SleepSummaryServices.getSleepSummaryAvgStats(sleepArray);
        teamData[userId].sleepTotals = SleepSummaryServices.getTotalStats(sleepArray);
      }
    });
    return teamData;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

const test = async () => {

};

export {
  getTeamDashboard,
  test,
};
