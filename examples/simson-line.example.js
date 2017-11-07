import React from 'react';
import Scene from '../geoms/scene';
import ReactScene from '../react/scene';

const scene = new Scene();

const inter = (P, A, B) => {
  const { x: ax, y: ay } = A;
  const { x: bx, y: by } = B;
  const { x: px, y: py } = P;
  const k = (by - ay) / (bx - ax);
  const x = (ay - py - px / k - k * ax) / (-k - 1 / k);
  const y = ay + k * (x - ax);
  return { x, y };
};

scene
  .circle('O', 250, 250, 180)
  .layer()
  .pointOnCircle('A', 'O', 40)
  .pointOnCircle('B', 'O', 150)
  .pointOnCircle('C', 'O', 300)
  .layer()
  .triangle('ABC', 'A', 'B', 'C')
  .layer()
  .pointOnCircle('P', 'O', 90)
  .layer()
  .pointFn('D', ({ P, A, B }) => inter(P, A, B))
  .pointFn('E', ({ P, B, C }) => inter(P, B, C))
  .pointFn('F', ({ P, C, A }) => inter(P, C, A))
  .segment('PD', 'P', 'D')
  .segment('PE', 'P', 'E')
  .segment('PF', 'P', 'F')
  .layer()
  .segment('AF', 'A', 'F')
  .segment('BE', 'B', 'E')
  .segment('CD', 'C', 'D')
  .layer()
  .segment('DE', 'D', 'E')
  .segment('EF', 'E', 'F');

export default () => <ReactScene scene={scene} />;
