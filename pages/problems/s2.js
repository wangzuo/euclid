import React from 'react';
import Scene from '../../geoms/scene';
import ReactScene from '../../components/scene';

const scene = new Scene();

scene
  .point('A', 200, 80)
  .point('B', 50, 200)
  .point('C', 120, 450)
  .point('D', 350, 400)
  .point('E', 450, 200)
  .layer()
  .segment('AC', 'A', 'C')
  .segment('AD', 'A', 'D')
  .segment('BD', 'B', 'D')
  .segment('BE', 'B', 'E')
  .segment('CE', 'C', 'E')
  .layer()
  .intersection('F', 'AC', 'BE')
  .intersection('G', 'AD', 'BE')
  .intersection('H', 'AC', 'BD')
  .intersection('I', 'CE', 'BD')
  .intersection('J', 'AD', 'CE')
  .layer()
  .circumcircle('O1', 'A', 'F', 'G')
  .circumcircle('O2', 'E', 'G', 'J')
  .circumcircle('O3', 'D', 'I', 'J')
  .circumcircle('O4', 'C', 'H', 'I')
  .circumcircle('O5', 'B', 'F', 'H')
  .layer()
  .intersection(['X1', 'Y1'], 'O1', 'O2')
  .intersection(['X2', 'Y2'], 'O2', 'O3')
  .intersection(['X3', 'Y3'], 'O3', 'O4')
  .intersection(['X4', 'Y4'], 'O4', 'O5')
  .intersection(['X5', 'Y5'], 'O5', 'O1')
  .layer()
  .circumcircle('O', 'X1', 'X2', 'X3');

export default () => <ReactScene scene={scene} />;
