export class InvalidArgumentError extends Error {}

export const assert = (assertionResult: boolean, errorMessage: string) => {
  if (!assertionResult) {
    throw new InvalidArgumentError(errorMessage);
  }
};
