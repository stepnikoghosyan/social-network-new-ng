export interface IParsedJwt {
  readonly _id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly gender: string;
  readonly exp: number;
}
