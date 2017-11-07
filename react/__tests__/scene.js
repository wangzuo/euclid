import React from 'react';
import renderer from 'react-test-renderer';
import Scene from '../scene';

jest.mock('../draggable');

test('triangle', () => {
  const s = require('../../examples/triangle').default;
  expect(renderer.create(<Scene scene={s} />).toJSON()).toMatchSnapshot();
});

test('circumcircle', () => {
  const s = require('../../examples/circumcircle').default;
  expect(renderer.create(<Scene scene={s} />).toJSON()).toMatchSnapshot();
});

test('s1', () => {
  const s = require('../../examples/s1').default;
  expect(renderer.create(<Scene scene={s} />).toJSON()).toMatchSnapshot();
});

test('s2', () => {
  const s = require('../../examples/s2').default;
  expect(renderer.create(<Scene scene={s} />).toJSON()).toMatchSnapshot();
});
