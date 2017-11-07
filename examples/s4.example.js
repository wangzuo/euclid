import React from 'react';
import Scene from '../geoms/scene';
import ReactScene from '../react/scene';

const scene = new Scene();

const tanG = deg => Math.tan(deg * Math.PI / 180);

scene
  .point('B', 350, 300)
  .point('D', 150, 100)
  .layer()
  .segment('BD', 'B', 'D')
  .pointFn('A', ({ B: { x: bx, y: by }, D: { x: dx, y: dy } }) => {
    const a = Math.atan((by - dy) / (bx - dx)) * 180 / Math.PI;
    const k1 = tanG(a + 80);
    const k2 = tanG(a + 140);
    const x = (by - dy - k2 * bx + k1 * dx) / (k1 - k2);
    const y = k1 * (x - dx) + dy;
    return { x, y };
  })
  .pointFn('C', ({ B: { x: bx, y: by }, D: { x: dx, y: dy } }) => {
    const a = Math.atan((by - dy) / (bx - dx)) * 180 / Math.PI;
    const k1 = tanG(a - 50);
    const k2 = tanG(a - 110);
    const x = (by - dy - k2 * bx + k1 * dx) / (k1 - k2);
    const y = k1 * (x - dx) + dy;
    return { x, y };
  })
  .layer()
  .segment('AB', 'A', 'B')
  .segment('AD', 'A', 'D')
  .segment('BC', 'B', 'C')
  .segment('CD', 'C', 'D')
  .segment('AC', 'A', 'C');

// console.log(scene.angle('B', 'A', 'C'));

export default () => <ReactScene scene={scene} />;
