export class UnknownHost extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    this.name = UnknownHost.name;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
