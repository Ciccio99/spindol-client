import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import COLORS from 'constants/colors';
import blob2 from 'assets/blobs/shape_blob-02.svg';
import rectangle3 from 'assets/blobs/shape_rectangle-03.svg';
import blob1 from 'assets/blobs/shape_blob-01.svg';
import hexagon from 'assets/blobs/shape_hexagon.svg';
import semicircle1 from 'assets/blobs/shape_semicircle-01.svg';
import rectangle2 from 'assets/blobs/shape_rectangle-02.svg';
import semicircle3 from 'assets/blobs/shape_semicircle-03.svg';
import blob5 from 'assets/blobs/shape_blob-05.svg';
import rectangle1 from 'assets/blobs/shape_rectangle-01.svg';
import circle from 'assets/blobs/shape_circle.svg';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
  },
  backgroundContainer: {
    background: (props) => `${props.background || COLORS.LIGHT_BLUE}`,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  blob: {
    zIndex: -1,
  },

}));

const ActiveBackground = ({ background, fullWidth, translateX, translateY, children }) => {
  const classes = useStyles({ background });

  return (
    <div className={clsx(classes.backgroundContainer, { [classes.fullWidth]: fullWidth })}>
      <MovingBlob x={130} y={155} translateX={translateX} translateY={translateY} asset={semicircle3} />
      <MovingBlob x={412} y={75} translateX={translateX} translateY={translateY} asset={blob1} />
      <MovingBlob x={850} y={149} translateX={translateX} translateY={translateY} asset={rectangle2} />
      <MovingBlob x={1200} y={75} translateX={translateX} translateY={translateY} asset={rectangle1} />
      <MovingBlob x={1443} y={183} translateX={translateX} translateY={translateY} asset={circle} />

      <MovingBlob x={464} y={411} translateX={translateX} translateY={translateY} asset={hexagon} />
      <MovingBlob x={883} y={475} translateX={translateX} translateY={translateY} asset={circle} />
      <MovingBlob x={1226} y={453} translateX={translateX} translateY={translateY} asset={blob5} />

      <MovingBlob x={123} y={589} translateX={translateX} translateY={translateY} asset={blob1} />
      <MovingBlob x={369} y={724} translateX={translateX} translateY={translateY} asset={semicircle3} />
      <MovingBlob x={775} y={952} translateX={translateX} translateY={translateY} asset={blob1} />
      <MovingBlob x={1445} y={800} translateX={translateX} translateY={translateY} asset={rectangle2} />
      <MovingBlob x={1498} y={817} translateX={translateX} translateY={translateY} asset={hexagon} />
      {/* <MovingBlob x={35} y={100} asset={blob2} />
      <MovingBlob x={410} y={39} asset={blob1} />
      <MovingBlob x={850} y={100} asset={hexagon} />
      <MovingBlob x={1160} y={35} asset={semicircle3} />
      <MovingBlob x={1600} y={75} asset={circle} /> */}
      {/* split */}
      {/* <MovingBlob x={-100} y={430} asset={rectangle3} />
      <MovingBlob x={200} y={400} asset={semicircle1} />
      <MovingBlob x={600} y={380} asset={rectangle2} />
      <MovingBlob x={1050} y={420} asset={blob5} />
      <MovingBlob x={1400} y={320} asset={rectangle1} />
      <MovingBlob x={1750} y={380} asset={blob2} /> */}
      {/* Split */}

      {children}
    </div>
  );
};

const useBlobStyles = makeStyles(() => ({
  blob: {
    position: 'absolute',
    zIndex: 0,

    mixBlendMode: 'soft-light',
  },
}));

const getPosition = () => ((Math.random() * 2) - 1) * 30;

const MovingBlob = ({ x = 0, y = 0, asset = undefined, translateX = 0, translateY = 0 }) => {
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
      className={clsx(classes.blob, classes.rotateLeft)}
      style={{
        left: x + translateX,
        top: y + translateY,
        transform: `translate3d(${xPos}px, ${yPos}px, 0)`,
        transition: `transform ${timeInterval}ms ease-in-out`,
      }}
    />
  );
};

export default ActiveBackground;
