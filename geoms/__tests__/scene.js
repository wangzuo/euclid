import renderer from 'react-test-renderer';
import Scene from '../scene';

test('triangle', () => {
  const s = require('../../examples/triangle').default;
  expect(s.area('A', 'B', 'C')).toMatchSnapshot();
  expect(s.toJSON()).toMatchSnapshot();
});

test('circumcircle', () => {
  const s = require('../../examples/circumcircle').default;
  expect(s.toJSON()).toMatchSnapshot();
});

test('s1', () => {
  const s = require('../../examples/s1').default;
  expect(s.toJSON()).toMatchSnapshot();
  const a1 = s.area('A', 'B', 'C');
  const a2 = s.area('G', 'H', 'I');
  expect(a1).toMatchSnapshot();
  expect(a2).toMatchSnapshot();
  expect(a1 / a2).toMatchSnapshot();
});

test('s2', () => {
  const s = require('../../examples/s2').default;
  expect(s.toJSON()).toMatchSnapshot();
});

test('movePoint', () => {
  const s = new Scene();
  s.point('A', 10, 10);
  expect(s.toJSON()).toMatchSnapshot();
  s.movePoint('A', 20, 20);
  expect(s.toJSON()).toMatchSnapshot();
});
