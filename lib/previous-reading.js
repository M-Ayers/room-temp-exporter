class PreviousReading {
  constructor() {
    if (!PreviousReading.instance) {
      this._data = {};
      PreviousReading.instance = this;
    }
    return PreviousReading.instance;
  }

  add(id, value) {
    this._data[id] = value;
  }

  get(id) {
    return this._data[id];
  }
}

const instance = new PreviousReading();
Object.freeze(instance);

module.exports = instance;
