import Geom from './geom';

export default class Circle extends Geom {
  toString() {
    return `${this.name} (${this.x}, ${this.y}) ${this.r}`;
  }

  toJSON() {
    return Object.assign(super.toJSON(), {
      type: 'Circle',
      x: this.x,
      y: this.y,
      r: this.r
    });
  }
}
