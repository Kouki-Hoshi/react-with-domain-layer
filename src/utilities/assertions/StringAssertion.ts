import { assert } from "./BaseAssertion";

export class StringAssertion {
  private constructor(
    private readonly value: string,
    private readonly paramName: string
  ) {}

  static of(value: string, paramName: string): StringAssertion {
    return new StringAssertion(value, paramName);
  }

  notEmpty = (): StringAssertion => {
    assert(!!this.value, `${this.paramName}は必須です`);
    return this;
  };

  lengthAtLeast = (minLength: number) => {
    assert(
      this.value.length >= minLength,
      `${this.paramName}は${minLength}以上の文字数でなければいけません`
    );
    return this;
  };

  lengthAtMost = (maxLength: number) => {
    assert(
      this.value.length <= maxLength,
      `${this.paramName}は${maxLength}以下の文字数でなければいけません`
    );
    return this;
  };

  pattern = (regex: RegExp) => {
    assert(regex.test(this.value), `${this.paramName}の形式が正しくありません`);
  };
}
