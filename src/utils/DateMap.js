import moment from 'moment-timezone';

class DateMap {
  constructor(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error('DateMap Must include start and end dates');
    }
    const start = moment(startDate).utc();
    const end = moment(endDate).utc();
    if (!start || !end) {
      throw new Error('DateMap Must use valid dates');
    }
    this.dateArr = [];
    this.dateMap = new Map();

    while (start.diff(end, 'day') <= 0) {
      const date = start.format('YYYY-MM-DD');
      const i = this.dateArr.push({ date });
      this.dateMap.set(date, i - 1);
      start.add(1, 'day');
    }
  }

  get(dateString) {
    const index = this.dateMap.get(dateString);
    if (!index || index >= this.dateArr.length) {
      throw new Error('get(): passed in dateString does not result in a valid index');
    }
    return this.dateArr[index];
  }

  getAll() {
    return this.dateArr;
  }

  getRange(startDate, endDate) {
    let startInd = this.dateMap.get(startDate);
    let endInd = this.dateMap.get(endDate);

    if (startInd === undefined) {
      startInd = 0;
    }
    if (endInd === undefined) {
      endInd = this.dateArr.length - 1;
    }

    if (endDate <= startDate) {
      throw new Error('getRange(): start-date must be before end-date');
    }

    const data = this.dateArr.slice(startInd, endInd + 1);
    return data;
  }

  getRangeByCount(startDate, count) {
    let startInd = this.dateMap.get(startDate);
    if (startInd === undefined) {
      const start = moment.utc(this.dateArr[0].date);
      // const end = moment.utc(this.dateArr[this.dateArr.length - 1].date);
      const userDate = moment.utc(startDate);
      if (userDate.diff(start, 'day') < 0) {
        startInd = 0;
      } else {
        startInd = this.dateArr.length - 1;
      }
      // else if (userDate.diff(end, 'day') > 0) {
      //   startInd = this.dateArr.length - 1;
      // }
    }

    let endInd = startInd + count;

    if (endInd < 0) {
      endInd = 0;
    } else if (endInd >= this.dateArr.length) {
      endInd = this.dateArr.length - 1;
    }

    if (endInd < startInd) {
      const temp = startInd;
      startInd = endInd;
      endInd = temp;
    }

    const data = this.dateArr.slice(startInd, endInd + 1);
    return data;
  }

  join(date, data) {
    const i = this.dateMap.get(date);
    if (i === undefined) {
      throw new Error('Date does not exist');
    }
    this.dateArr[i] = { ...this.dateArr[i], ...data };
  }
}

export default DateMap;
