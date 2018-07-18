import React from 'react';
import Scene from '../../geoms/scene';
import ReactScene from '../../components/scene';

const scene = new Scene();

scene
  .point('F', 150, 100)
  .point('A', 350, 100)
  .point('E', 100, 300)
  .point('C', 300, 300)
  .point('G', 220, 100)
  .point('B', 379.5, 167.5)
  .point('D', 259.5, 366.5)
  .layer()
  .segment('FA', 'F', 'A')
  .segment('AC', 'A', 'C')
  .segment('CE', 'C', 'E')
  .segment('EF', 'E', 'F')
  .segment('CG', 'C', 'G')
  .segment('AB', 'A', 'B')
  .segment('EG', 'E', 'G')
  .segment('BD', 'B', 'D')
  .segment('DE', 'D', 'E')
  .segment('DF', 'D', 'F')
  .segment('BG', 'B', 'G');

export default () => <ReactScene scene={scene} />;
