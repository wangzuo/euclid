import Geom from './geom';

export default class Line extends Geom {
  toString() {
    return `${this.name} ${this.p1} -> ${this.p2}`;
  }

  toJSON() {
    return Object.assign(super.toJSON(), {
      type: 'Line',
      p1: this.p1,
      p2: this.p2
    });
  }
}
