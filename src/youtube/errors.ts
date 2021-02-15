export class UnknownHostError extends Error {
  constructor(message?: string) {
    super(message); 
    this.name = UnknownHostError.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
