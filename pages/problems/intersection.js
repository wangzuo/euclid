import Scene from '../geoms/scene';

const scene = new Scene();

scene
  .circle('A', 150, 150, 100)
  .circle('B', 250, 250, 100)
  .layer()
  .intersection(['C', 'D'], 'A', 'B')
  .point('E', 50, 50)
  .point('F', 400, 400)
  .layer()
  .segment('EF', 'E', 'F')
  .layer()
  .intersection(['G', 'H'], 'EF', 'A')
  .intersection(['I', 'J'], 'B', 'EF')
  .point('K', 400, 100)
  .point('L', 100, 400)
  .segment('KL', 'K', 'L')
  .intersection(['M', 'N'], 'KL', 'B')
  .intersection('O', 'KL', 'EF');

export default scene;
