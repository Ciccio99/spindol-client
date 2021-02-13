import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMobile from 'hooks/useMobile';
import COLORS from 'constants/colors';
import blob2 from 'assets/blobs/shape_blob-02.svg';
import blob1 from 'assets/blobs/shape_blob-01.svg';
import hexagon1 from 'assets/blobs/shape_hexagon-01.svg';
import hexagon2 from 'assets/blobs/shape_hexagon-02.svg';
import rectangle2 from 'assets/blobs/shape_rectangle-02.svg';
import semicircle3 from 'assets/blobs/shape_semicircle-02.svg';
import blob5 from 'assets/blobs/shape_blob-03.svg';
import rectangle1 from 'assets/blobs/shape_rectangle-01.svg';
import circle1 from 'assets/blobs/shape_circle-01.svg';
import circle2 from 'assets/blobs/shape_circle-02.svg';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: -1,
  },
  container: {
    background: (props) => `${props.background || COLORS.LIGHT_BLUE}`,
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 0,
  },
}));

const ActiveBackground = (props) => {
  const { children, mobileScale = 1, scale = 1, background, ...otherProps } = props;
  const classes = useStyles({ background });
  const { isMobile } = useMobile();

  return (
    <div className={classes.container}>
      {
        isMobile
          ? <BlobsContainerMobile {...otherProps} scale={mobileScale} />
          : <BlobsContainerDesktop {...otherProps} scale={scale} />
      }

      {children}
    </div>
  );
};

const BlobsContainerDesktop = ({ fullWidth, translateX, translateY, scale }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.backgroundContainer, { [classes.fullWidth]: fullWidth })}>
      <MovingBlob x={76} y={177} scale={scale} translateX={translateX} translateY={translateY} asset={semicircle3} />
      <MovingBlob x={416} y={75} scale={scale} translateX={translateX} translateY={translateY} asset={blob1} />
      <MovingBlob x={724} y={160} scale={scale} translateX={translateX} translateY={translateY} asset={rectangle2} />
      <MovingBlob x={1077} y={75} scale={scale} translateX={translateX} translateY={translateY} asset={rectangle1} />
      <MovingBlob x={1443} y={183} scale={scale} translateX={translateX} translateY={translateY} asset={circle2} />

      <MovingBlob x={464} y={411} scale={scale} translateX={translateX} translateY={translateY} asset={hexagon1} />
      <MovingBlob x={883} y={440} scale={scale} translateX={translateX} translateY={translateY} asset={circle1} />
      <MovingBlob x={1226} y={453} scale={scale} translateX={translateX} translateY={translateY} asset={blob5} />

      <MovingBlob x={123} y={589} scale={scale} translateX={translateX} translateY={translateY} asset={blob2} />
      <MovingBlob x={400} y={724} scale={scale} translateX={translateX} translateY={translateY} asset={semicircle3} />
      <MovingBlob x={775} y={800} scale={scale} translateX={translateX} translateY={translateY} asset={blob1} />
      <MovingBlob x={1229} y={824} scale={scale} translateX={translateX} translateY={translateY} asset={rectangle1} />
      <MovingBlob x={1498} y={598} scale={scale} translateX={translateX} translateY={translateY} asset={hexagon2} />
    </div>
  );
};

const BlobsContainerMobile = ({ fullWidth, translateX, translateY, scale }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.backgroundContainer, { [classes.fullWidth]: fullWidth })}>
      <MovingBlob x={76} y={177} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={semicircle3} />
      <MovingBlob x={416} y={75} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={blob1} />
      <MovingBlob x={724} y={160} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={rectangle2} />
      <MovingBlob x={1077} y={75} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={rectangle1} />
      <MovingBlob x={1443} y={183} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={circle2} />

      <MovingBlob x={464} y={411} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={hexagon1} />
      <MovingBlob x={883} y={440} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={circle1} />
      <MovingBlob x={1226} y={453} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={blob5} />

      <MovingBlob x={123} y={589} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={blob1} />
      <MovingBlob x={400} y={724} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={semicircle3} />
      <MovingBlob x={775} y={800} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={blob1} />
      <MovingBlob x={1229} y={824} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={rectangle2} />
      <MovingBlob x={1498} y={598} scale={scale} translateX={translateX * scale} translateY={translateY * scale} asset={hexagon2} />
    </div>
  );
};

const useBlobStyles = makeStyles(() => ({
  blob: {
    position: 'absolute',
    maxWidth: 200,
    width: '100%',
    zIndex: 0,
  },
  mobileBlob: {
    width: '30%',
  },
}));

const getPosition = () => ((Math.random() * 2) - 1) * 30;

const MovingBlob = ({
  x = 0, y = 0, asset = undefined, scale = 1, translateX = 0, translateY = 0,
}) => {
  const classes = useBlobStyles();
  const maxTime = 5;
  const minTime = 2;
  const [xPos, setXPos] = useState(getPosition());
  const [yPos, setYPos] = useState(getPosition());
  const [timeInterval, setTimeInterval] = useState(3000);

  useEffect(() => {
    const transitionInterval = (Math.random() * (maxTime - minTime) + minTime) * 1000;
    setTimeInterval(transitionInterval);

    const interval = setInterval(() => {
      setXPos(getPosition());
      setYPos(getPosition());
    }, transitionInterval);

    return () => { clearInterval(interval); };
  }, []);

  if (!asset) {
    return null;
  }

  return (
    <img
      alt="Blob"
      src={asset}
      className={clsx(classes.blob, { [classes.mobileBlob]: true })}
      style={{
        left: ((x + translateX) * scale),
        top: ((y + translateY) * scale),
        transform: `translate3d(${xPos}px, ${yPos}px, 0)`,
        transition: `transform ${timeInterval}ms ease-in-out`,
      }}
    />
  );
};

export default ActiveBackground;
