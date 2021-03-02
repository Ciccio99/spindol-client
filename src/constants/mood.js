import {
  AwesomeFaceIcon,
  GoodFaceIcon,
  MehFaceIcon,
  BadFaceIcon,
  AwfulFaceIcon,
  EmptyFaceIcon,
} from 'components/common/FaceIcons';

import awesomeFace from 'assets/emoticons/awesome-face.svg';
import goodFace from 'assets/emoticons/good-face.svg';
import mehFace from 'assets/emoticons/meh-face.svg';
import badFace from 'assets/emoticons/bad-face.svg';
import awfulFace from 'assets/emoticons/awful-face.svg';
import emptyFace from 'assets/emoticons/empty-face.svg';

import { ReactComponent as AwesomeFaceComponent } from 'assets/emoticons/awesome-face.svg';
import { ReactComponent as GoodFaceComponent } from 'assets/emoticons/good-face.svg';
import { ReactComponent as MehFaceComponent } from 'assets/emoticons/meh-face.svg';
import { ReactComponent as BadFaceComponent } from 'assets/emoticons/bad-face.svg';
import { ReactComponent as AwfulFaceComponent } from 'assets/emoticons/awful-face.svg';
import { ReactComponent as EmptyFaceComponent } from 'assets/emoticons/empty-face.svg';

export const MOODS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  MEH: 'meh',
  BAD: 'bad',
  AWFUL: 'awful',
};

export const MOOD_VALUES = {
  excellent: 4,
  good: 3,
  meh: 2,
  bad: 1,
  awful: 0,
};

export const VALUES_MOOD = {
  4: 'excellent',
  3: 'good',
  2: 'meh',
  1: 'bad',
  0: 'awful',
};

export const MOOD_COLOR = {
  excellent: '#5EBC88',
  good: '#B0D25A',
  meh: '#FFC929',
  bad: '#F68B3B',
  awful: '#DF1D3D',
};

export const getMoodIcon = (mood) => {
  switch (mood) {
    case 'excellent':
      return AwesomeFaceIcon;
    case 'good':
      return GoodFaceIcon;
    case 'meh':
      return MehFaceIcon;
    case 'bad':
      return BadFaceIcon;
    case 'awful':
      return AwfulFaceIcon;
    default:
      return EmptyFaceIcon;
  }
};

export const getMoodSvg = (mood) => {
  switch (mood) {
    case 'excellent':
      return awesomeFace;
    case 'good':
      return goodFace;
    case 'meh':
      return mehFace;
    case 'bad':
      return badFace;
    case 'awful':
      return awfulFace;
    default:
      return emptyFace;
  }
};

export const getMoodComponent = (mood) => {
  switch (mood) {
    case 'excellent':
      return AwesomeFaceComponent;
    case 'good':
      return GoodFaceComponent;
    case 'meh':
      return MehFaceComponent;
    case 'bad':
      return BadFaceComponent;
    case 'awful':
      return AwfulFaceComponent;
    default:
      return EmptyFaceComponent;
  }
};
