import "./deleteTask.css";

const DeleteConfirm = ({
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}) => {
  return (
    <div>
      <p>{message}</p>
      <div className="button__section">
        <button onClick={onConfirm} className="deleteBtn">{confirmText}</button>
        <button onClick={onClose} className="cancelBtn">{cancelText}</button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
