import Geom from './geom';

export default class Point extends Geom {
  toJSON() {
    return Object.assign(super.toJSON(), {
      type: 'Point',
      x: this.x,
      y: this.y
    });
  }

  toString() {
    return `${this.name}(${this.x}, ${this.y})`;
  }
}
