import { StringAssertion } from "../utilities/assertions/StringAssertion";
import { UserEmail, UserId, UserPassword } from "./user";

export class AccessToken {
  constructor(readonly value: string) {
    StringAssertion.of(value, "アクセストークン").notEmpty();
  }
}

export class RefreshToken {
  constructor(readonly value: string) {
    StringAssertion.of(value, "リフレッシュトークン").notEmpty();
  }
}

export type AccessTokens = {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
};

export class AuthenticationError extends Error {
  message: string = "認証が失敗しました";
}

export interface Authenticator {
  /**
   * ログインする.
   * @param userIdentify ユーザ識別子
   * @param password パスワード
   * @return AccessToken アクセストークン
   * @throw AuthenticationError 認証情報が正しくないとき
   */
  login(userIdentify: UserId | UserEmail, password: UserPassword): AccessTokens;
}
