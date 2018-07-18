import React from 'react';
import Scene from '../../geoms/scene';
import ReactScene from '../../components/scene';

const scene = new Scene();

const tanG = deg => Math.tan((deg * Math.PI) / 180);

scene
  .point('A', 200, 400)
  .point('B', 300, 400)
  .layer()
  .pointFn('E', ({ A: { x: ax, y: ay }, B: { x: bx, y: by } }) => {
    const a = (Math.atan((ay - by) / (ax - bx)) * 180) / Math.PI;
    const k1 = tanG(a - 80);
    const k2 = tanG(a - 130);
    const x = (by - ay + k1 * ax - k2 * bx) / (k1 - k2);
    const y = k1 * (x - ax) + ay;
    return { x, y };
  })
  .pointFn('F', ({ A: { x: ax, y: ay }, B: { x: bx, y: by } }) => {
    const a = (Math.atan((ay - by) / (ax - bx)) * 180) / Math.PI;
    const k1 = tanG(a - 60);
    const k2 = tanG(a - 100);
    const x = (by - ay + k1 * ax - k2 * bx) / (k1 - k2);
    const y = k1 * (x - ax) + ay;
    return { x, y };
  })
  .layer()
  .segment('AB', 'A', 'B')
  .segment('AE', 'A', 'E')
  .segment('BE', 'B', 'E')
  .segment('AF', 'A', 'F')
  .segment('BF', 'B', 'F')
  .segment('EF', 'E', 'F');

console.log('EAF', scene.angle('E', 'A', 'F'));
console.log('EFA', scene.angle('E', 'F', 'A'));

export default () => <ReactScene scene={scene} />;
