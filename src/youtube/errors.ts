export class UnknownHost extends Error {
  constructor(message?: string) {
    super(message);
    this.name = UnknownHost.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
