import { ReactComponent as blob1 } from 'assets/shapes/shape_blob-01.svg';
import { ReactComponent as blob2 } from 'assets/shapes/shape_blob-02.svg';
import { ReactComponent as blob3 } from 'assets/shapes/shape_blob-03.svg';
import { ReactComponent as circle1 } from 'assets/shapes/shape_circle-01.svg';
import { ReactComponent as circle2 } from 'assets/shapes/shape_circle-02.svg';
import { ReactComponent as circle3 } from 'assets/shapes/shape_circle-03.svg';
import { ReactComponent as hexagon1 } from 'assets/shapes/shape_hexagon-01.svg';
import { ReactComponent as hexagon2 } from 'assets/shapes/shape_hexagon-02.svg';
import { ReactComponent as hexagon3 } from 'assets/shapes/shape_hexagon-03.svg';
import { ReactComponent as rectangle1 } from 'assets/shapes/shape_rectangle-01.svg';
import { ReactComponent as rectangle2 } from 'assets/shapes/shape_rectangle-02.svg';
import { ReactComponent as rectangle3 } from 'assets/shapes/shape_rectangle-03.svg';
import { ReactComponent as semiCircle1 } from 'assets/shapes/shape_semicircle-01.svg';
import { ReactComponent as semiCircle2 } from 'assets/shapes/shape_semicircle-02.svg';

const SHAPES = {
  BLOB_1: blob1,
  BLOB_2: blob2,
  BLOB_3: blob3,
  CIRCLE_1: circle1,
  CIRCLE_2: circle2,
  CIRCLE_3: circle3,
  HEXAGON_1: hexagon1,
  HEXAGON_2: hexagon2,
  HEXAGON_3: hexagon3,
  RECTANGLE_1: rectangle1,
  RECTANGLE_2: rectangle2,
  RECTANGLE_3: rectangle3,
  SEMI_CIRCLE_1: semiCircle1,
  SEMI_CIRCLE_2: semiCircle2,
};

const SHAPE_COLORS = [
  '#FF3328',
  '#03BE78',
  '#224887',
  '#1E8AF4',
  '#FEBD6D',
  '#A88DFF',
  '#E5E5E5',
  '#A5B8FD',
  '#D287A5',
  '#A7C5C3',
  '#F4D8FE',
  '#FFD9D0',
];

export const getShape = (shapeId) => {
  const shape = SHAPES[shapeId];
  if (!shape) {
    return SHAPES.BLOB_1;
  }

  return shape;
};

export const getRandomShapeId = () => {
  const idArr = Object.keys(SHAPES);
  const randInd = Math.floor(Math.random() * idArr.length);
  return idArr[randInd];
};

export const getRandomShape = () => {
  const shapesArr = Object.values(SHAPES);
  const randInd = Math.floor(Math.random() * shapesArr.length);
  return shapesArr[randInd];
};

export const getRandomShapeColor = () => {
  const randInd = Math.floor(Math.random() * SHAPE_COLORS.length);
  return SHAPE_COLORS[randInd];
};
