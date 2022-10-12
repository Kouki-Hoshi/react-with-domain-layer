import {
  AccessToken,
  AccessTokens,
  Authenticator,
  RefreshToken,
} from "../../domains/authentication";
import { UserEmail, UserId, UserPassword } from "../../domains/user";

export class APIAuthenticator implements Authenticator {
  login(
    userIdentify: UserId | UserEmail,
    password: UserPassword
  ): AccessTokens {
    // API を実行したとする.
    const apiResult = { accessToken: "AAAAA", refreshToken: "RRRRRRRR" };
    return {
      accessToken: new AccessToken(apiResult.accessToken),
      refreshToken: new RefreshToken(apiResult.refreshToken),
    };
  }
}
