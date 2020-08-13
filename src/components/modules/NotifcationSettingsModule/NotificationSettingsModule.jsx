import React, { useState, useEffect } from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Switch,
} from '@material-ui/core';
import { useAsync } from 'react-async';
import {
  getCurrentDailyReminder,
  updateDailyEmailReminderById,
  insertDailyEmailReminder,
} from 'services/notification-service';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import PanelModule from 'components/organizers/PanelModule';
const TITLE = 'Manage Notifications';

const PanelWrapper = ({ children }) => (
  <PanelModule title={TITLE}>
    {children}
  </PanelModule>
);

const NotificationSettingsModule = () => {
  const dispatchAlert = useAlertSystemDispatch();
  const {
    data, error, isPending, setData,
  } = useAsync(getCurrentDailyReminder);
  const [dailyEmailReminder, setDailyEmailReminder] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(true);
  useEffect(() => {
    setDailyEmailReminder(data?.enabled || false);
  }, [data]);

  const handleChange = (e) => {
    setDailyEmailReminder(e.target.checked);
    (async () => {
      setSwitchEnabled(false);
      const oldData = data;
      try {
        let newData = data;
        if (!data?._id) {
          newData = await insertDailyEmailReminder();
        } else {
          const dto = {
            enabled: e.target.checked,
          }
          newData = await updateDailyEmailReminderById(data._id, dto);
        }
        setData(newData);
        dispatchAlert({
          type: 'SUCCESS',
          message: `Daily email reminders are ${newData.enabled ? 'on': 'off'}`,
        });
      } catch (error) {
        setData(oldData);
        dispatchAlert({
          type: 'WARNING',
          message: error.message,
        });
      } finally {
        setSwitchEnabled(true);
      }
    })();
  };

  if (isPending) {
    return (
      <PanelWrapper>
        <LinearProgress color="secondary" />
      </PanelWrapper>
    );
  }


  return (
    <PanelWrapper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Daily Email Reminders</Typography>
        <Switch
          checked={dailyEmailReminder}
          name="dailyEmailReminder"
          onChange={handleChange}
          disabled={!switchEnabled}
        />
      </Box>
    </PanelWrapper>
  );
};

export default NotificationSettingsModule;
