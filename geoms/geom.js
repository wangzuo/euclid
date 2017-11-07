export default class Geom {
  constructor(name, fn, pos) {
    this.name = name;
    this.update = objects => {
      Object.assign(this, fn(objects));
    };
    this.pos = null;
    if (pos) {
      this.pos = (x, y) => pos(x, y, this._scene._objects);
    }
  }

  updateFn(fn) {
    this.update = objects => {
      Object.assign(this, fn(objects));
    };
  }

  toJSON() {
    return {
      name: this.name,
      pos: this.pos,
      draggable: this.pos != null
    };
  }

  toString() {
    return this.name;
  }
}
