import {
  AwesomeFaceIcon,
  GoodFaceIcon,
  MehFaceIcon,
  BadFaceIcon,
  AwfulFaceIcon,
  EmptyFaceIcon,
} from 'components/common/FaceIcons';

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
