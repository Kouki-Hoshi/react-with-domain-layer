type CancelButtonProps = {
  label: string;
  onClick: () => void;
};

const CancelButton: React.FC<CancelButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default CancelButton;
