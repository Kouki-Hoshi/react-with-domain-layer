import SubmitButton from "../buttons/SubmitButton";
import ErrorText from "../text/ErrorText";
import FormTitle from "../titles/FormTitle";
import CheckboxInput, { CheckboxInputProps } from "./inputs/CheckboxInput";
import SingleInputText, {
  SingleTextInputProps,
} from "./inputs/SingleTextInput";

type SingleInputViewModel = {
  type: "SingleTextInput";
  properties: SingleTextInputProps;
};

type CheckboxInputViewModel = {
  type: "CheckBox";
  properties: CheckboxInputProps;
};

export type InputViewModel = SingleInputViewModel | CheckboxInputViewModel;

export const isSingleText = (
  viewModel: InputViewModel
): viewModel is SingleInputViewModel => {
  return viewModel.type === "SingleTextInput";
};
export const isCheckbox = (
  viewModel: InputViewModel
): viewModel is CheckboxInputViewModel => {
  return viewModel.type === "CheckBox";
};

export type ValidationError = { key: string; error: string };

type SimpleFormProps<T> = {
  title: string;
  value: T;
  inputs: InputViewModel[];
  error: string;
  validationErrors: ValidationError[];
  submit: (value: T) => void;
  submitButtonName: string;
};

const SimpleForm = <T,>({
  title,
  inputs,
  value,
  error,
  validationErrors,
  submit,
  submitButtonName = "送信",
}: SimpleFormProps<T>) => {
  return (
    <div>
      <FormTitle title={title} />
      <ErrorText message={error} />
      <div>
        {inputs.map((inputViewModel) => {
          const validationError = validationErrors.find(
            (error) => error.key === inputViewModel.properties.key
          );
          if (isSingleText(inputViewModel)) {
            return (
              <div>
                <SingleInputText {...inputViewModel.properties} />
                {validationError && (
                  <ErrorText message={validationError.error} />
                )}
              </div>
            );
          }
          if (isCheckbox(inputViewModel)) {
            return (
              <div>
                <CheckboxInput {...inputViewModel.properties} />
                {validationError && (
                  <ErrorText message={validationError.error} />
                )}
              </div>
            );
          }
          return <></>;
        })}
      </div>
      <SubmitButton onSubmit={() => submit(value)} label={submitButtonName} />
    </div>
  );
};

export default SimpleForm;
