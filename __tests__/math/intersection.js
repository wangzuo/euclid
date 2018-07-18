import { lineLine, circleCircle, lineCircle } from '../math/intersection';

test('lineLine', () => {
  expect(
    lineLine(
      { p1: { x: 50, y: 50 }, p2: { x: 400, y: 400 } },
      { p1: { x: 400, y: 100 }, p2: { x: 100, y: 400 } }
    )
  ).toMatchSnapshot();
});

test('circleCircle', () => {
  expect(
    circleCircle({ x: 150, y: 150, r: 100 }, { x: 250, y: 250, r: 100 })
  ).toMatchSnapshot();
});

test('lineCircle', () => {
  expect(
    lineCircle(
      { p1: { x: 50, y: 50 }, p2: { x: 400, y: 400 } },
      { x: 150, y: 150, r: 100 }
    )
  ).toMatchSnapshot();
});
