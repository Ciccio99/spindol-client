import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import DailyDiaryServices from 'services/DailyDiaryServices';
import SleepTrialTrackerServices from 'services/SleepTrialTrackerServices';
import LinkOnClick from 'components/linkOnClick/LinkOnClick';
import InformationReport from 'components/sleepTrialReport/InformationReport';
import SleepReport from 'components/sleepTrialReport/SleepReport';
import MoodReport from 'components/sleepTrialReport/MoodReport';

const SleepTrialReportView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [sleepTrialTracker, setSleepTrialTracker] = useState();
  const [dailyDiaries, setDailyDiaries] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stt = await SleepTrialTrackerServices.getById(id);
        setSleepTrialTracker(stt);

        const match = {
          date: { $gte: stt.startDate, $lte: stt.endDate },
        };
        const dds = await DailyDiaryServices.query(match);
        setDailyDiaries(dds);
      } catch (error) {
        setSleepTrialTracker(null);
        setDailyDiaries(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading) {
    return (
      <Box p={5}>
        <LinearProgress />
      </Box>
    );
  }

  if (!sleepTrialTracker) {
    return (
      <Box p={2} my={5} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">
          Could not find sleep trial tracker data...
        </Typography>
        <LinkOnClick onClick={() => { history.goBack(); }}>Go Back</LinkOnClick>
      </Box>
    );
  }
  return (
    <Container>
      <Box mb={2}>
        <Box mt={2} mb={2}>
          <Typography variant="h3">
            Sleep Trial Report
          </Typography>
        </Box>
        <InformationReport
          sleepTrialTracker={sleepTrialTracker}
        />
        <MoodReport
          dailyDiaries={dailyDiaries}
          checkIns={sleepTrialTracker.checkIns}
        />
        <SleepReport
          dailyDiaries={dailyDiaries}
          sleepTrialTracker={sleepTrialTracker}
        />
      </Box>
    </Container>
  );
};

export default SleepTrialReportView;
