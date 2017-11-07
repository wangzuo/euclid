export default class Layer {
  constructor() {
    this._objects = {};
  }

  add(object) {
    this._objects[object.name] = object; // ordered map
  }

  objects() {
    return Object.values(this._objects);
  }

  update(scene) {
    this.objects().forEach(object => {
      object.update(scene._objects);
    });
  }

  toString() {
    const objects = this.objects();
    return objects.map(object => object.toString()).join('\n');
  }
}
