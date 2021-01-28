import React from 'react';
import { SvgIcon } from '@material-ui/core';
import flame from 'assets/flame.svg';
import crossCircle from 'assets/cross-circle.svg';
import spindolLogoSvg from 'assets/spindol-logo.svg';
import { ReactComponent as SleepingCat } from 'assets/icons/sleeping-cat.svg';

const DEFAULT_SIZE = 50;

export const MenuIcon = (props) => (
  <SvgIcon {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.88379 5H22.8838V7H8.88379V5ZM2.88379 11H22.8838V13H2.88379V11ZM22.8838 17H14.8838V19H22.8838V17Z"
      fill="#121212"
    />
  </SvgIcon>
);

export const FlameIcon = ({ size, ...props }) => (
  <img
    src={flame}
    width={size || DEFAULT_SIZE}
    height={size || DEFAULT_SIZE}
    alt="flame icon"
    {...props}
  />
);

export const CancelIcon = ({ size, ...props }) => (
  <img
    src={crossCircle}
    width={size || DEFAULT_SIZE}
    height={size || DEFAULT_SIZE}
    alt="cancel icon"
    {...props}
  />
);

export const SpindolLogoIcon = ({ size, ...props }) => (
  <img src={spindolLogoSvg} width={size || 100} alt="Spindol Logo" {...props} />
);

export const SleepingCatIcon = ({ size, ...props }) => (
  <SleepingCat
    width={size || DEFAULT_SIZE}
    height={size || DEFAULT_SIZE}
    alt="Sleeping Cat Icon"
    {...props}
  />
);
