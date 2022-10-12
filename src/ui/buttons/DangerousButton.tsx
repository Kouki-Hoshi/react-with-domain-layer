type DangerousButtonProps = {
  label: string;
  dangerousAction: () => void;
};

const DangerousButton: React.FC<DangerousButtonProps> = ({
  label,
  dangerousAction,
}) => {
  return <button onClick={dangerousAction}>{label}</button>;
};

export default DangerousButton;
