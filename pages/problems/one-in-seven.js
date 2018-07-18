import React from 'react';
import Scene from '../../geoms/scene';
import ReactScene from '../../components/scene';

const scene = new Scene();

scene
  .point('A', 200, 100)
  .point('B', 50, 400)
  .point('C', 400, 300)
  .layer()
  .segment('AB', 'A', 'B')
  .segment('BC', 'B', 'C')
  .segment('AC', 'A', 'C')
  .pointFn('D', ({ A, B }) => ({
    x: (2 / 3) * A.x + (1 / 3) * B.x,
    y: (2 / 3) * A.y + (1 / 3) * B.y
  }))
  .pointFn('E', ({ B, C }) => ({
    x: (2 / 3) * B.x + (1 / 3) * C.x,
    y: (2 / 3) * B.y + (1 / 3) * C.y
  }))
  .pointFn('F', ({ C, A }) => ({
    x: (2 / 3) * C.x + (1 / 3) * A.x,
    y: (2 / 3) * C.y + (1 / 3) * A.y
  }))
  .layer()
  .segment('CD', 'C', 'D')
  .segment('AE', 'A', 'E')
  .segment('BF', 'B', 'F')
  .layer()
  .intersection('G', 'CD', 'AE')
  .intersection('H', 'AE', 'BF')
  .intersection('I', 'CD', 'BF');

export default () => <ReactScene scene={scene} />;
