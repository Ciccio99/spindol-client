import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import DailyDiaryServices from '../../services/DailyDiaryServices';
import AlertSystemContext from '../../context/alertSystemContext';
import DailyDiaryDetailsPanel from '../../components/dailyDiaryDetailsPanel/DailyDiaryDetailsPanel';

const CheckInsView = () => {
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [dailyDiaries, setDailyDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  // useEffect(() => {
  //   (async () => {
  //     const dailyDiaryCheckIns = await DailyDiaryServices.getAllDailyDiary();
  //     if (dailyDiaryCheckIns.length === 0) {
  //       dispatchAlertSystem({
  //         type: 'WARNING',
  //         message: 'No Daily Diary check-ins available yet.',
  //       });
  //       return;
  //     }
  //     setDailyDiaries(dailyDiaryCheckIns);
  //   })();
  // }, [dispatchAlertSystem]);

  const handleDateChange = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
  }

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant='h3'>Your Daily Diary</Typography>
      </Box>
      <Box mb={3}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            variant='inline'
            inputVariant='outlined'
            margin='normal'
            InputAdornmentProps={{ position: "start" }}
            label='Select a date to view'
            format='MM-DD-YYYY'
            disableFuture={true}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <DailyDiaryDetailsPanel selectedDate={selectedDate}/>

      {/* <Grid container>
      {
        !dailyDiaries
        ? null
        : dailyDiaries.map((dd) => {
          return <Grid key={dd._id} item xs={12}><DailyDiaryCheckIn dailyDiary={dd}/></Grid>;
        })
      }
      </Grid> */}
      {/* <Box>
        <Grid container>
          {
            !dailyDiaries
            ? null
            : dailyDiaries.map((dd) => {
              return (<Grid item xs={12}>
                <Typography>{moment(dd.date).utc().format('MMM D, YYYY')}</Typography>

                <Typography>{dd.mood}</Typography>
              </Grid>);
            })
          }
        </Grid>
      </Box> */}
    </Container>
  );
};

export default CheckInsView;
