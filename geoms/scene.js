import Layer from './layer';
import Point from './point';
import Line from './line';
import Circle from './circle';
import { lineLine, circleCircle, lineCircle } from '../math/intersection';
import { circumcircle, area, angle, incircle, random } from '../math/util';

class Scene {
  constructor() {
    this._currentLayer = new Layer();
    this._layers = [this._currentLayer];
    this._objects = {};
    // todo: width & svg
    this.width = 500;
    this.height = 500;
  }

  layer() {
    this._currentLayer = new Layer();
    this._layers.push(this._currentLayer);
    return this;
  }

  add(object) {
    this._currentLayer.add(object);
    this._objects[object.name] = object;
    object.update(this._objects);
    return this;
  }

  objects() {
    return Object.values(this._objects);
  }

  points() {
    return this.objects().filter(obj => obj instanceof Point);
  }

  lines() {
    return this.objects().filter(obj => obj instanceof Line);
  }

  circles() {
    return this.objects().filter(obj => obj instanceof Circle);
  }

  point(name, x, y) {
    return this.pointFn(name, () => ({ x, y }), (x, y) => ({ x, y }));
  }

  pointFn(name, fn, pos) {
    const p = new Point(name, fn, pos);
    p._scene = this;
    return this.add(p);
  }

  pointOnCircle(A, O, angle) {
    return this.pointFn(
      A,
      objects => {
        const { x: cx, y: cy, r } = objects[O];
        const x = cx + r * Math.sin(angle / 180 * Math.PI);
        const y = cy - r * Math.cos(angle / 180 * Math.PI);
        return { x, y };
      },
      (x, y, objects) => {
        const circle = objects[O];
        const { x: cx, y: cy, r } = circle;
        const angle = Math.atan2(x - cx, cy - y);
        const dx = cx + r * Math.sin(angle);
        const dy = cy - r * Math.cos(angle);

        return { x: dx, y: dy };
      }
    );
  }

  triangle(name, A, B, C) {
    this.segment(`${A}${B}`, A, B);
    this.segment(`${B}${C}`, B, C);
    this.segment(`${A}${C}`, A, C);

    return this;
  }

  segment(name, A, B) {
    return this.add(
      new Line(name, objects => ({
        p1: objects[A].toJSON(),
        p2: objects[B].toJSON()
      }))
    );
  }

  circle(name, x, y, r) {
    return this.add(new Circle(name, () => ({ x, y, r })));
  }

  circleFn(name, fn) {
    return this.add(new Circle(name, fn));
  }

  circumcircle(name, A, B, C) {
    return this.circleFn(name, objects =>
      circumcircle(objects[A], objects[B], objects[C]));
  }

  incircle(name, A, B, C) {
    return this.circleFn(name, objects =>
      incircle(objects[A], objects[B], objects[C]));
  }

  intersection(name, A, B) {
    const o1 = this.get(A);
    const o2 = this.get(B);

    if (o1 instanceof Line && o2 instanceof Line) {
      return this.pointFn(name, objects => lineLine(objects[A], objects[B]));
    } else if (o1 instanceof Circle && o2 instanceof Circle) {
      this.pointFn(name[0], objects => circleCircle(objects[A], objects[B])[0]);
      this.pointFn(name[1], objects => circleCircle(objects[A], objects[B])[1]);
      return this;
    } else if (o1 instanceof Line && o2 instanceof Circle) {
      this.pointFn(name[0], objects => lineCircle(objects[A], objects[B])[0]);
      this.pointFn(name[1], objects => lineCircle(objects[A], objects[B])[1]);
      return this;
    } else if (o1 instanceof Circle && o2 instanceof Line) {
      this.pointFn(name[0], objects => lineCircle(objects[B], objects[A])[0]);
      this.pointFn(name[1], objects => lineCircle(objects[B], objects[A])[1]);
      return this;
    }

    return this;
  }

  get(name) {
    return this._objects[name];
  }

  area(A, B, C) {
    const p1 = this.get(A);
    const p2 = this.get(B);
    const p3 = this.get(C);

    return area(p1, p2, p3);
  }

  angle(A, B, C) {
    return angle(this.get(A), this.get(B), this.get(C));
  }

  update() {
    this._layers.forEach((layer, i) => {
      layer.update(this);
    });
    return this;
  }

  movePoint(name, x, y) {
    const point = this.get(name);
    point.updateFn(() => ({ x, y }));
    return this.update();
  }

  toString() {
    const objects = this.objects();
    return objects.map(object => object.toString()).join('\n');
  }

  toJSON() {
    // todo: point -> line -> circle
    return this.objects()
      .sort((a, b) => {
        if (a instanceof Line) return -1;
        if (b instanceof Line) return 1;
        return 0;
      })
      .map(obj => obj.toJSON());
  }

  // todo
  import() {}

  // todo
  export() {}
}

export default Scene;
