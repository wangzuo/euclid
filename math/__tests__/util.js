import { dist, circumcircle, area, angle } from '../util';

test('dist', () => {
  expect(dist({ x: 10, y: 10 }, { x: 120, y: 30 })).toMatchSnapshot();
});

test('circumcircle', () => {
  expect(
    circumcircle(
      { x: 100, y: 100 },
      {
        x: 50,
        y: 200
      },
      {
        x: 300,
        y: 300
      }
    )
  ).toMatchSnapshot();
});

test('area', () => {
  expect(
    area(
      { x: 100, y: 100 },
      {
        x: 50,
        y: 200
      },
      {
        x: 300,
        y: 300
      }
    )
  ).toMatchSnapshot();
});

test('angle', () => {
  expect(
    angle({ x: 100, y: 100 }, { x: 50, y: 200 }, { x: 300, y: 300 })
  ).toMatchSnapshot();
});
