import React from "react";
import { Authenticator } from "../../domains/authentication";
import { UserId, UserPassword } from "../../domains/user";
import { LoginUsecase, Input, Presenter } from "../../usecases/login";
import { APIAuthenticator } from "../domains/authentication";

class LoginInteractor implements LoginUsecase {
  constructor(private readonly authenticator: Authenticator) {}

  execute(input: Input, presenter: Presenter): void {
    // TODO: validationError の組み込み方法
    const userId = new UserId(input.userId);
    const password = new UserPassword(input.password);
    if (input.keepLogin) {
      presenter.showKeepLoginWarning(() => {
        this.executeLogin(userId, password, presenter, true);
      });
    }
    this.executeLogin(userId, password, presenter, true);
  }

  private executeLogin(
    userId: UserId,
    password: UserPassword,
    presenter: Presenter,
    saveRefreshToken: boolean
  ) {
    try {
      const { accessToken, refreshToken } = this.authenticator.login(
        userId,
        password
      );
      localStorage.setItem("ACCESS_TOKEN", accessToken.value);
      if (saveRefreshToken) {
        localStorage.setItem("REFRESH_TOKEN", refreshToken.value);
      }
      presenter.onSuccess();
    } catch (e) {
      if (e instanceof Error) {
        presenter.onFailure(e.message);
      }
      throw e;
    }
  }
}

export const LoginUseCaseContext = React.createContext<LoginUsecase>({
  execute: () => {},
});

export const LoginUsecaseProvider = (props: { children: React.ReactNode }) => {
  const instance = new LoginInteractor(new APIAuthenticator());
  return (
    <LoginUseCaseContext.Provider value={instance}>
      {props.children}
    </LoginUseCaseContext.Provider>
  );
};
