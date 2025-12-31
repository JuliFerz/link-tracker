export class Link {

  constructor(
    public readonly id: number | null,
    public targetUrl: string,
    public hashId: string,
    public isValid: boolean,
    public visits: number = 0,
    public createdAt: Date = new Date(),
    public password?: string,
    public expiresAt?: Date,
  ) { }

  set hash(hashId: string) {
    this.hashId = hashId;
  }

  incrementVisit(): void {
    this.visits++;
  }

  invalidate(): void {
    this.isValid = false;
  }

  checkIsExpired(date: Date): boolean {
    if (!!this.expiresAt && date > this.expiresAt) return true;
    return false;
  }

  checkPassword(password: string): boolean {
    if (!this.password) return true;
    return password === this.password;
  }
}