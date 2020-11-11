import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Popover,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment-timezone';
import { useQueryCache, useMutation } from 'react-query';
import { useAlertSystemDispatch } from 'context/alertSystemContext';
import useDashboardHabits from 'hooks/useDashboardHabits';
import useActiveHabits from 'hooks/useActiveHabits';
import useMobile from 'hooks/useMobile';
import { upsertBedtimeHabit, upsertWaketimeHabit } from 'services/HabitServices';
import { isValidTime } from 'utils/time';
import HABITS from 'constants/Habits';
import COLORS from 'constants/colors';
import waketimeSvg from 'assets/illus-waketime.svg';
import waketimeSvgSmol from 'assets/illus-waketime-smol.svg';
import bedtimeSvg from 'assets/illus-bedtime.svg';
import bedtimeSvgSmol from 'assets/illus-bedtime-smol.svg';

const useStyles = makeStyles((theme) => ({
  textHighlight: { color: COLORS.RED },
  cellPadding: {
    padding: `${theme.spacing(2)}px 0`,
  },
  cellHeaderPadding: {
    padding: `${theme.spacing(1)}px 0`,
  },
  table: {
    width: '100%',
    '& td': {
      textAlign: 'center',
      verticalAlign: 'center',
    },
  },
  svgText: {
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.h4.fontFamily,
    fontWeight: theme.typography.h4.fontWeight,
  },
  timeDisplay: {
    color: COLORS.DARK_BLUE,
    textTransform: 'uppercase',
    borderBottom: `1px dashed ${COLORS.DARK_BLUE}`,
    cursor: 'pointer',
  },
  timeInput: {
    color: COLORS.DARK_BLUE,
    fontSize: theme.typography.h1.fontSize,
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: theme.typography.h1.fontWeight,
    border: 'none',
    caretColor: COLORS.RED,
    maxWidth: '130px',
    '&:focus': {
      outline: 'none',
    },
  },
  period: {
    color: COLORS.DARK_BLUE,
    cursor: 'pointer',
  },
  periodSelected: {
    color: COLORS.RED,
  },
  popover: {
    pointerEvents: 'none',
  },
  habitIcon: {
    marginBottom: `${theme.spacing(1)}px`,
  },
}));

const SleepGoalsModule = () => {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const { data: habitData } = useDashboardHabits();
  const { data: activeHabits } = useActiveHabits();
  const iconSize = isMobile ? 36 : 48;

  if (habitData && activeHabits) {
    return (
      <div>
        <div>
          <Typography variant="subtitle1">
            {'Bedtime and Waketime over the last '}
            <span className={classes.textHighlight}>7 days</span>
          </Typography>
        </div>
        <Box mt={2}>
          <Paper elevation={24}>
            <Box px={1} py={2} display="flex" justifyContent="center" alignItems="center">
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th className={classes.cellHeaderPadding} />
                    {
                      habitData.map((data) => (
                        <th key={data.date} className={classes.cellHeaderPadding}>
                          <Typography variant="h4">{data.date}</Typography>
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td className={classes.cellPadding}>
                      <Box p={1} display="flex" flexDirection="column" alignItems={isMobile ? 'start' : 'center'}>
                        <img className={classes.habitIcon} src={bedtimeSvg} width={iconSize} alt="bedtime moon illustration" />
                        <HabitEditor habit={activeHabits.bedtime} />
                      </Box>
                    </td>
                    {
                      habitData.map((data) => (
                        <td key={data.date} className={classes.cellPadding}>
                          <HabitCircle habit={data.bedtime} />
                        </td>
                      ))
                    }
                  </tr>
                  <tr>
                    <td className={classes.cellPadding}>
                      <Box p={1} display="flex" flexDirection="column" alignItems={isMobile ? 'start' : 'center'}>
                        <img className={classes.habitIcon} src={waketimeSvg} width={iconSize} alt="waketime sun illustration" />
                        <HabitEditor habit={activeHabits.waketime} />
                      </Box>
                    </td>
                    {
                      habitData.map((data) => (
                        <td key={data.date} className={classes.cellPadding}>
                          <HabitCircle habit={data.waketime} />
                        </td>
                      ))
                    }
                  </tr>
                </tbody>
              </table>
            </Box>
          </Paper>
        </Box>
      </div>
    );
  }
  return null;
};

const HabitCircle = ({ habit }) => {
  const classes = useStyles();
  const { isMobile } = useMobile();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const radius = isMobile ? 12 : 32;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  if (!habit) {
    return <CircleSvg radius={radius} color={COLORS.LIGHT_GRAY} />;
  }

  const delta = Math.abs(habit.delta);
  let color;
  let textColor = COLORS.BLACK;
  if (delta < 30) {
    color = COLORS.GREEN;
  } else if (delta < 60) {
    color = COLORS.PEACH;
  } else if (delta < 90) {
    color = COLORS.YELLOW;
  } else {
    color = COLORS.RED;
    textColor = COLORS.WHITE;
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <CircleSvg
        radius={radius}
        color={color}
        textColor={textColor}
        text={isMobile ? '' : `${habit.delta} MIN`}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        aria-owns={open ? 'mouse-over-popover-habit' : undefined}
        aria-haspopup="true"
      />
      <Popover
        id="mouse-over-popover-habit"
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        elevation={24}
        disableRestoreFocus
      >
        <Box p={2} maxWidth={280}>
          <Box mb={1} display="flex" alignItems="center">
            {
              habit.bedtime
                ? (<img src={bedtimeSvgSmol} width={24} alt="bedtime moon illustration" />)
                : (<img src={waketimeSvgSmol} width={24} alt="waketime sun illustration" />)
            }

            <Typography variant="subtitle2" style={{ paddingLeft: '8px' }}>{habit.target}</Typography>
          </Box>
          {
            habit.bedtime
              ? (<Typography variant="body1">You went to bed <span className={classes.textHighlight}>{delta} minutes</span> {habit.delta < 0 ? 'before' : 'after'} your goal bedtime.</Typography>)
              : (<Typography variant="body1">You woke up <span className={classes.textHighlight}>{delta} minutes</span> {habit.delta < 0 ? 'before' : 'after'} your goal waketime.</Typography>)
          }
        </Box>
      </Popover>
    </>
  );
};

const CircleSvg = ({
  radius, color, textColor, text, ...other
}) => {
  const classes = useStyles();

  return (
    <svg height={radius * 2} width={radius * 2} {...other}>
      <circle cx={radius} cy={radius} r={radius} stroke={color} strokeWidth="0" fill={color} />
      {
        text
          ? (
            <text className={clsx(classes.svgText)} fill={textColor || COLORS.BLACK} x="50%" y="50%" textAnchor="middle" alignmentBaseline="central">
              {text}
            </text>
          )
          : null
      }

    </svg>
  );
};

const HabitEditor = ({ habit }) => {
  const dispatchAlert = useAlertSystemDispatch();
  const queryCache = useQueryCache();
  const goalTime = habit ? moment().startOf('day').add(habit.targetValue, 'minutes') : undefined;

  const [saveBedtimeHabit] = useMutation(
    (newTarget) => upsertBedtimeHabit(newTarget),
    {
      onMutate: (value) => {
        queryCache.cancelQueries('activeHabits');
        const oldActiveHabits = queryCache.getQueryData('activeHabits');

        queryCache.setQueryData('activeHabits', (oldData) => ({
          ...oldData,
          [HABITS.BEDTIME]: {
            name: 'Bedtime',
            startDate: moment().format('YYYY-MM-DD'),
            dataType: 'bedtime',
            targetValue: value,
          },
        }));

        // This is passed into the rollback parameter for onError/success/settles/etc
        return () => queryCache.setQueryData('activeHabits', oldActiveHabits);
      },
      onError: (error, values, rollback) => {
        dispatchAlert({
          type: 'ERROR',
          message: error.message,
        });
        if (rollback) {
          rollback();
        }
      },
      onSettled: () => {
        queryCache.invalidateQueries('activeHabits');
      },
    },
  );

  const [saveWaketimeHabit] = useMutation(
    (newTarget) => upsertWaketimeHabit(newTarget),
    {
      onMutate: (value) => {
        queryCache.cancelQueries('activeHabits');
        const oldActiveHabits = queryCache.getQueryData('activeHabits');
        // Optimistic update
        queryCache.setQueryData('activeHabits', (oldData) => ({
          ...oldData,
          [HABITS.WAKETIME]: {
            name: 'Waketime',
            startDate: moment().format('YYYY-MM-DD'),
            dataType: 'waketime',
            targetValue: value,
          },
        }));
        // This is passed into the rollback parameter for onError/success/settles/etc
        return () => queryCache.setQueryData('activeHabits', oldActiveHabits);
      },
      onError: (error, values, rollback) => {
        dispatchAlert({
          type: 'ERROR',
          message: error.message,
        });
        if (rollback) {
          rollback();
        }
      },
      onSettled: () => {
        queryCache.invalidateQueries('activeHabits');
      },
    },
  );

  const handleOnChange = (newTarget) => {
    if (habit.target === habit.targetValue) { return; }

    switch (habit.dataType) {
      case HABITS.BEDTIME:
        saveBedtimeHabit(newTarget);
        break;
      case HABITS.WAKETIME:
        saveWaketimeHabit(newTarget);
        break;
      default:
    }
  };

  return (
    <TimePicker initTime={goalTime} currentValue={habit.targetValue} popTitle={`Set ${habit.name}`} onChange={handleOnChange} />
  );
};

const TimePicker = ({
  initTime, currentValue, popTitle, onChange,
}) => {
  const originalTime = initTime ? moment(initTime).format('hh:mm') : moment().format('hh:mm');
  const originalPeriod = initTime ? moment(initTime).format('A') : moment().format('A');
  const classes = useStyles();
  const { isMobile } = useMobile();
  const [input, setInput] = useState(originalTime);
  const [period, setPeriod] = useState(originalPeriod);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    if (isValidTime(input)) {
      const newTime = moment(`${input} ${period}`, 'hh:mm A');
      const targetVal = newTime.diff(moment().startOf('day'), 'minutes');
      if (currentValue !== targetVal) {
        onChange(targetVal);
      }
    } else {
      setInput(originalTime);
    }
    setAnchorEl(null);
  };

  const handleOnInputChange = (val) => {
    const regex = /(^((1$|1[0-2]|0[1-9]?)(:?([0-5][0-9]?$)?))$)|(^$)/;

    if (regex.test(val)) {
      setInput((oldInput) => {
        let newInput = val;
        if (newInput.length === 2 && oldInput.length !== 3 && newInput.indexOf(':') === -1) {
          newInput += ':';
        }

        if (newInput.length === 2 && oldInput.length === 3) {
          newInput = newInput.slice(0, 1);
        }

        return newInput;
      });
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" onClick={handleOnClick}>
        <Typography className={classes.timeDisplay} variant={isMobile ? 'h4' : 'subtitle1'} display="inline" noWrap>{moment(initTime).format('h:mm A')}</Typography>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleOnClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={24}
      >
        <Box p={2}>
          <Typography variant="subtitle2">{popTitle || ''}</Typography>
          <Box display="flex" alignItems="center">
            <div>
              <form onSubmit={handleOnSubmit} autoComplete="off">
                <input
                  value={input}
                  name="time"
                  type="text"
                  onChange={(e) => handleOnInputChange(e.target.value)}
                  className={clsx(classes.timeInput)}
                />
              </form>
            </div>
            <div>
              <Period currentValue={period} value="AM" onClick={() => { setPeriod('AM'); }} />
              <Period currentValue={period} value="PM" onClick={() => { setPeriod('PM'); }} />
            </div>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

const Period = ({ currentValue, value, ...other }) => {
  const classes = useStyles();
  return (
    <div {...other}>
      <Typography
        variant="h2"
        className={clsx(classes.period, {
          [classes.periodSelected]: (value === currentValue),
        })}
      >
        {value}
      </Typography>
    </div>
  );
};

export default SleepGoalsModule;
