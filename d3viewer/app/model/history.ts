export class History<T> {
  history: T[];
  callback = function (model: T) {}

  constructor(model: T) {
    this.history = [model];
  }

  current(): T {
    return this.history[0];
  }

  push(model: T) {
    this.history.push(model);
    this.callback(model);
  }

  onChange(callback: (T) => void) {
    this.callback = callback;
  }
}
