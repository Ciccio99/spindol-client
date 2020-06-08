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
import Section from 'components/organizers/Section';

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
      <Container>
        <Box mb={4}>
          <Box mt={5}>
            <Typography variant="h3">
              Sleep Trial Report
            </Typography>
          </Box>
          <Box pt={8}>
            <LinearProgress />
          </Box>
        </Box>
      </Container>
    );
  }

  if (!sleepTrialTracker) {
    return (
      <Container>
        <Box mt={5}>
          <Typography variant="h3">
            Sleep Trial Report
          </Typography>
        </Box>
        <Box p={2} my={5} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">
            Could not find sleep trial tracker data...
          </Typography>
          <LinkOnClick onClick={() => { history.goBack(); }}>Go Back</LinkOnClick>
        </Box>
      </Container>
    );
  }
  return (
    <Container>
      <Box mb={4}>
        <Box mt={5}>
          <Typography variant="h3">
            Sleep Trial Report
          </Typography>
        </Box>
        <Section>
          <InformationReport
            sleepTrialTracker={sleepTrialTracker}
          />
        </Section>
        <Section>
          <MoodReport
            dailyDiaries={dailyDiaries}
            checkIns={sleepTrialTracker.checkIns}
          />
        </Section>
        <Section>
          <SleepReport
            dailyDiaries={dailyDiaries}
            sleepTrialTracker={sleepTrialTracker}
          />
        </Section>
      </Box>
    </Container>
  );
};

export default SleepTrialReportView;
