export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokenPair {
  _userId: string;
  _id?: string;
}

export interface ITokenResponse extends ITokenPair {
  accessExpiresIn: string;
  refreshExpiresIn: string;
}
