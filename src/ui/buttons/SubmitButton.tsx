type SubmitButtonProps = {
  label: string;
  onSubmit: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onSubmit }) => {
  return <button onClick={onSubmit}>{label}</button>;
};

export default SubmitButton;
