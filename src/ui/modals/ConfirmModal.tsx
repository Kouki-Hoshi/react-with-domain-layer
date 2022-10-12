import CancelButton from "../buttons/CancelButton";
import SubmitButton from "../buttons/SubmitButton";

type ConfirmModalProps = {
  title: string;
  content: React.ReactNode;
  confirmButtonTitle: string;
  confirm: () => void;
  cancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  content,
  confirmButtonTitle,
  confirm,
  cancel,
}) => {
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
      <div>
        <SubmitButton label={confirmButtonTitle} onSubmit={confirm} />
        <CancelButton label={"キャンセル"} onClick={cancel} />
      </div>
    </div>
  );
};

export default ConfirmModal;
