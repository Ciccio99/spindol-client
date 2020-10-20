import React from 'react';
import awesomeFace from 'assets/emoticons/awesome-face.svg';
import goodFace from 'assets/emoticons/good-face.svg';
import mehFace from 'assets/emoticons/meh-face.svg';
import badFace from 'assets/emoticons/bad-face.svg';
import awfulFace from 'assets/emoticons/awful-face.svg';
import emptyFace from 'assets/emoticons/empty-face.svg';

const DEFAULT_SIZE = 50;

export const AwesomeFaceIcon = ({ size }) => (
  <img src={awesomeFace} width={size || DEFAULT_SIZE} height={size || DEFAULT_SIZE} alt="awesome mood icon" />
);

export const GoodFaceIcon = ({ size }) => (
  <img src={goodFace} width={size || DEFAULT_SIZE} height={size || DEFAULT_SIZE} alt="good mood icon" />
);

export const MehFaceIcon = ({ size }) => (
  <img src={mehFace} width={size || DEFAULT_SIZE} height={size || DEFAULT_SIZE} alt="meh mood icon" />
);

export const BadFaceIcon = ({ size }) => (
  <img src={badFace} width={size || DEFAULT_SIZE} height={size || DEFAULT_SIZE} alt="bad mood icon" />
);

export const AwfulFaceIcon = ({ size }) => (
  <img src={awfulFace} width={size || DEFAULT_SIZE} height={size || DEFAULT_SIZE} alt="awful mood icon" />
);

export const EmptyFaceIcon = ({ size }) => (
  <img src={emptyFace} width={size || DEFAULT_SIZE} height={size || DEFAULT_SIZE} alt="awful mood icon" />
);
