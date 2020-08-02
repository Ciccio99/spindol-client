import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import moment from 'moment-timezone';
import { getTeamDashboard } from 'services/TeamServices';
import ViewHeader from 'components/ViewHeader';
import Section from 'components/organizers/Section';
import PanelModule from 'components/organizers/PanelModule';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '32px',
    overflow: 'hidden',
    position: 'relative',
    'border-radius': '50px',
  },
  colorPrimary: {
    'background-color': '#EBEBEB',
  },
  barColorPrimary: {
    background: 'linear-gradient(135deg, rgba(148,121,188,1) 0%, rgba(230,126,86,1) 50%, rgba(250,201,89,1) 100%)',
  },
});

const TeamView = () => {
  const classes = useStyles();
  const currentDate = moment();
  const { data, isPending } = useAsync(getTeamDashboard);
  const [goal, setGoal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalTeamSleep, setTotalTeamSleep] = useState(0);

  useEffect(() => {
    if (data) {
      const memberIds = Object.keys(data);
      const objectiveGoal = memberIds.length * 8 * 7;
      const totalSleep = memberIds
        .reduce((total, id) => (total + data[id].sleepTotals.sleepTime), 0);
      const teamProgress = (totalSleep / objectiveGoal) * 100;
      setGoal(objectiveGoal);
      setProgress(teamProgress);
      setTotalTeamSleep(totalSleep);
    }
  }, [data]);

  if (isPending) {
    return (
      <Container>
        <ViewHeader>
          Team Founders
        </ViewHeader>
        <Section>
          <PanelModule title="Weekly Objectives" subtitle="Reach your weekly objectives by supporting each other and keeping eachother accountable!">
            <LinearProgress color="secondary" />
          </PanelModule>
        </Section>
      </Container>
    );
  }
  if (data) {
    return (
      <Container>
        <ViewHeader>
          Team Founders
        </ViewHeader>
        <Section>
          <PanelModule title="Weekly Objectives" subtitle="Reach your weekly objectives by supporting each other and keeping eachother accountable!">
            <Typography variant="h6" color="primary" gutterBottom><strong>No Sleep Left Behind</strong></Typography>
            <Typography variant="body1">
              {`As a team, acquire ${goal} hours of total sleep time (~8 Hours per night, per member).`}
            </Typography>
            <Box mt={4}>
              <LinearProgress
                value={progress}
                variant="determinate"
                classes={{
                  root: classes.root,
                  colorPrimary: classes.colorPrimary,
                  barColorPrimary: classes.barColorPrimary,
                }}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle1">{`Progress: ${progress.toFixed(0)}%`}</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6">Contributions:</Typography>
              <Typography variant="caption">
                {`Data as of ${currentDate.format('MMMM DD, YYYY')}`}
              </Typography>
              <Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Members</TableCell>
                      <TableCell align="left">Sleep Time Contribution</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      Object.keys(data).map((id) => (
                        <TableRow key={id}>
                          <TableCell>
                            {data[id].user.name}
                          </TableCell>
                          <TableCell>
                            {`${data[id].sleepTotals.sleepTime.toFixed(1)} hrs (${(100 * data[id].sleepTotals.sleepTime / totalTeamSleep).toFixed(0)}%)`}
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </PanelModule>
        </Section>
      </Container>
    );
  }
};

export default TeamView;
