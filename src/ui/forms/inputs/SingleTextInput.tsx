export type SingleTextInputProps = {
  key: string;
  label: string;
  value: string;
  placeholder: string;
  onChangeValue: (value: string) => void;
  secure?: boolean;
};

const SingleTextInput: React.FC<SingleTextInputProps> = ({
  key,
  label,
  value,
  placeholder,
  onChangeValue,
  secure,
}) => {
  return (
    <div>
      <div>{label}</div>
      <input
        type={secure ? "password" : "input"}
        id={key}
        name={key}
        value={value}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeValue(e.target.value)
        }
      />
    </div>
  );
};

export default SingleTextInput;
