import { StringAssertion } from "../utilities/assertions/StringAssertion";

export class UserEmail {
  constructor(readonly value: string) {
    StringAssertion.of(value, "メールアドレス")
      .notEmpty()
      .lengthAtMost(256)
      .pattern(
        /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
      );
  }
}

export class UserId {
  constructor(readonly value: string) {
    StringAssertion.of(value, "ユーザID")
      .notEmpty()
      .lengthAtMost(32)
      .pattern(/[-a-zA-Z0-9_.]+/);
  }
}

export class UserPassword {
  constructor(readonly value: string) {
    StringAssertion.of(value, "パスワード")
      .notEmpty()
      .lengthAtLeast(32)
      .pattern(/[-a-zA-Z0-9_.,!?#$%&]/);
  }
}
