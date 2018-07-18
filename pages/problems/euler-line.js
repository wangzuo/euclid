import React from 'react';
import Scene from '../../geoms/scene';
import ReactScene from '../../components/scene';
import { orthocenter, centroid } from '../../math/util';

const scene = new Scene();

scene
  .point('A', 200, 100)
  .point('B', 50, 400)
  .point('C', 400, 300)
  .triangle('ABC', 'A', 'B', 'C')
  .layer()
  .circumcircle('O', 'A', 'B', 'C')
  .layer()
  .pointFn('X', ({ O }) => ({ x: O.x, y: O.y }))
  .pointFn('Y', ({ A, B, C }) => orthocenter(A, B, C))
  .pointFn('Z', ({ A, B, C }) => centroid(A, B, C))
  .layer()
  .segment('XY', 'X', 'Y')
  .segment('YZ', 'Y', 'Z');

export default () => <ReactScene scene={scene} />;
