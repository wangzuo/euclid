import Scene from '../geoms/scene';

const scene = new Scene();

scene
  .point('A', 100, 100)
  .point('B', 50, 200)
  .point('C', 300, 300)
  .layer()
  .triangle('ABC', 'A', 'B', 'C')
  .layer()
  .circumcircle('O', 'A', 'B', 'C');

export default scene;
