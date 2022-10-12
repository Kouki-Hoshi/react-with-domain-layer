import { StringAssertion } from "./assertions/StringAssertion";

export class Assertion {
  static string = (value: string, paramName: string) =>
    new StringAssertion(value, paramName);
}
