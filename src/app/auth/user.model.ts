export class User {
  constructor(
    public email: string,
    public id: string,
    private token: string,
    private tokenExpirationDate: Date
  ) {}

  get tokenValue(): string {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }

  get tokenExpirationDateValue(): Date {
    if (this.tokenExpirationDate) {
      return this.tokenExpirationDate;
    }
    return null;
  }
}
