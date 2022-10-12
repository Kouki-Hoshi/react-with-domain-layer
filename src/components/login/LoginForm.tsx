import { useContext, useMemo, useState } from "react";
import {
  LoginUseCaseContext,
  LoginUsecaseProvider,
} from "../../infrastructures/usecases/login";
import SimpleForm, { InputViewModel } from "../../ui/forms/SimpleForm";
import Loading from "../../ui/overlays/Loading";
import { useNavigate } from "react-router-dom";
import { Presenter } from "../../usecases/login";
import ConfirmModal from "../../ui/modals/ConfirmModal";

type LoginPayload = {
  userId: string;
  password: string;
  keepLogin: boolean;
};

const initialPayload: LoginPayload = {
  userId: "",
  password: "",
  keepLogin: false,
};

type LoginResult = {
  loading: boolean;
  shouldConfirmKeepLogin: boolean;
  onConfirm: () => void;
  validationErrors: { key: string; error: string }[];
  error: string;
};

const initalResult: LoginResult = {
  loading: false,
  shouldConfirmKeepLogin: false,
  onConfirm: () => {},
  validationErrors: [],
  error: "",
};

const getInputsViewModel = (
  state: LoginPayload,
  setState: React.Dispatch<React.SetStateAction<LoginPayload>>
): InputViewModel[] => [
  {
    type: "SingleTextInput",
    properties: {
      key: "userId",
      label: "ユーザID",
      value: state.userId,
      placeholder: "ユーザIDを入力してください",
      onChangeValue: (_userId: string) =>
        setState({
          ...state,
          userId: _userId,
        }),
    },
  },
  {
    type: "SingleTextInput",
    properties: {
      key: "password",
      label: "パスワード",
      value: state.password,
      placeholder: "パスワードを入力してください",
      onChangeValue: (_password: string) =>
        setState({
          ...state,
          password: _password,
        }),
      secure: true,
    },
  },
  {
    type: "CheckBox",
    properties: {
      key: "keepLogin",
      label: "ログイン状態を維持する",
      value: state.keepLogin,
      onChangeValue: (_keepLogin: boolean) =>
        setState({
          ...state,
          keepLogin: _keepLogin,
        }),
    },
  },
];

const LoginForm: React.FC<{}> = ({}) => {
  const { execute } = useContext(LoginUseCaseContext);
  const [state, setState] = useState(initialPayload);
  const [result, setResult] = useState(initalResult);
  const naviagtion = useNavigate();

  const presenter: Presenter = useMemo(() => {
    return {
      // 非同期処理など処理中で何かさせたい場合
      startLoading: () => setResult({ ...initalResult, loading: true }),
      // 状況によってユーザに操作を促すケース
      showKeepLoginWarning: (onConfirm: () => void) =>
        setResult({ ...initalResult, shouldConfirmKeepLogin: true, onConfirm }),
      // 処理が成功した場合
      onSuccess: () => {
        setResult({ ...initalResult });
        naviagtion("/members");
      },
      // 以下は処理が失敗した場合
      onValidateError: (errors: { key: string; error: string }[]) =>
        setResult({ ...initalResult, validationErrors: errors }),
      onFailure: (error: string) => setResult({ ...initalResult, error }),
    };
  }, [setResult, naviagtion]);

  return (
    <LoginUsecaseProvider>
      {result.loading ? (
        <Loading />
      ) : (
        <>
          <SimpleForm
            inputs={getInputsViewModel(state, setState)}
            title={"ログイン"}
            value={state}
            validationErrors={result.validationErrors}
            error={result.error}
            submitButtonName={"ログイン"}
            submit={(value: LoginPayload) => execute(state, presenter)}
          />
          {result.shouldConfirmKeepLogin && (
            <ConfirmModal
              title={"確認"}
              content={
                <div>
                  この操作を実行すると、ログアウトするまでにこの機器では自動的にログイン状態になりますがよろしいですか？
                </div>
              }
              confirmButtonTitle={"確認"}
              confirm={result.onConfirm}
              cancel={() => setResult({ ...initalResult })}
            />
          )}
        </>
      )}
    </LoginUsecaseProvider>
  );
};

export default LoginForm;
