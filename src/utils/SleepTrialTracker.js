import moment from 'moment-timezone';
import DailyDiaryServices from 'services/DailyDiaryServices';

const MOOD_NUM_MAP = {
  excellent: 4,
  good: 3,
  meh: 2,
  bad: 1,
  awful: 0,
};

const NUM_MOOD_MAP = {
  4: 'excellent',
  3: 'good',
  2: 'meh',
  1: 'bad',
  0: 'awful',
};


const formatCurrentTrials = (sleepTrialTrackers) => {
  const today = moment();

  const formattedTrials = {};

  sleepTrialTrackers.forEach((stt) => {
    const trialEndDate = moment(moment.utc(stt.endDate).format('YYYY-MM-DD'));
    if (!stt.completed || today.diff(trialEndDate, 'days') === 0) {
      formattedTrials[stt.sleepTrial.type] = formattedTrials[stt.sleepTrial.type] || [];
      formattedTrials[stt.sleepTrial.type].push(stt);
    }
  });

  return formattedTrials;
};

const formatCompletedTrials = (sleepTrialTrackers) => {
  const formattedTrials = {};

  sleepTrialTrackers.forEach((stt) => {
    if (stt.completed) {
      formattedTrials[stt.sleepTrial.type] = formattedTrials[stt.sleepTrial.type] || [];
      formattedTrials[stt.sleepTrial.type].push(stt);
    }
  });

  return formattedTrials;
};

const getAvgCompleteMood = async (stt) => {
  const completedDates = stt.checkIns
    .filter((checkIn) => checkIn.completed )
    .map((checkIn) => checkIn.date);
  const match = {
    date: { $in: completedDates },
    mood: { $exists: true },
  };
  const dailyDiaries = await DailyDiaryServices.query(match);
  const avgMoodNum = dailyDiaries
    .reduce((accumulator, dd) => accumulator + (MOOD_NUM_MAP[dd.mood] / dailyDiaries.length), 0)

  return NUM_MOOD_MAP[Math.round(avgMoodNum)];
};

export default {
  formatCompletedTrials,
  formatCurrentTrials,
  getAvgCompleteMood,
};
