import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@material-ui/core';
import moment from 'moment-timezone';
import DailyDiaryServices from '../../services/DailyDiaryServices';
import AlertSystemContext from '../../context/alertSystemContext';
import DailyDiaryCheckIn from '../../components/dailyDiaryCheckIn/DailyDiaryCheckIn';

const CheckInsView = () => {
  const { dispatchAlertSystem } = useContext(AlertSystemContext);
  const [dailyDiaries, setDailyDiaries] = useState([]);

  useEffect(() => {
    (async () => {
      const dailyDiaryCheckIns = await DailyDiaryServices.getAllDailyDiary();
      if (dailyDiaryCheckIns.length === 0) {
        dispatchAlertSystem({
          type: 'WARNING',
          message: 'No Daily Diary check-ins available yet.',
        });
        return;
      }
      setDailyDiaries(dailyDiaryCheckIns);
    })();
  }, [dispatchAlertSystem]);

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Typography variant='h3'>Your Check-Ins</Typography>
      </Box>
      <Grid container>
      {
        !dailyDiaries
        ? null
        : dailyDiaries.map((dd) => {
          return <Grid key={dd._id} item xs={12}><DailyDiaryCheckIn dailyDiary={dd}/></Grid>;
        })
      }
      </Grid>
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
