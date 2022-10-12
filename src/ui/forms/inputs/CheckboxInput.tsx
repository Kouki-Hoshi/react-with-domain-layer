export type CheckboxInputProps = {
  key: string;
  label: string;
  value: boolean;
  onChangeValue: (value: boolean) => void;
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  key,
  label,
  value,
  onChangeValue,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={key}
        name={key}
        checked={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeValue(e.target.checked)
        }
      />
      <label htmlFor={key}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
