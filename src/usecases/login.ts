export type Input = {
  userId: string;
  password: string;
  keepLogin: boolean;
};

export interface Presenter {
  startLoading: () => void;
  showKeepLoginWarning: (onConfirm: () => void) => void;
  onSuccess: () => void;
  onValidateError: (errors: { key: string; error: string }[]) => void;
  onFailure: (error: string) => void;
}

export interface LoginUsecase {
  execute(input: Input, presenter: Presenter): void;
}
