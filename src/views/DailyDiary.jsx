import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid } from '@material-ui/core';
import Section from 'components/common/Section';
import DateSelector from 'components/dailyDiary/DateSelector';
import Journal from 'components/dailyDiary/Journal';
import MoodModule from 'components/dailyDiary/MoodModule';
import SleepModule from 'components/dailyDiary/SleepModule';

export default function DailyDiary() {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  };

  return (
    <Container>
      <Helmet>
        <title>Spindol - Daily Diary</title>
      </Helmet>
      <Section>
        <Box display="flex" justifyContent="center">
          <DateSelector onSetDate={handleDateChange} />
        </Box>
      </Section>
      <Section>
        <Journal date={selectedDate} />
      </Section>
      <Section>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column">
              <MoodModule date={selectedDate} />
              <Section>
                <SleepModule date={selectedDate} />
              </Section>
            </Box>
          </Grid>
        </Grid>

      </Section>
      {/* <Section>
        <DailyDiaryDetailsPanel selectedDate={selectedDate} />
      </Section> */}
    </Container>
  );
}
