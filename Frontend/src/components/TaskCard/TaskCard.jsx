import "./taskCard.css";
import editIcon from "../../assets/editIcon.png";
import deleteIcon from "../../assets/delete.png";
import { useState } from "react";
import Modal from "../Modal/Modal";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import DeleteConfirm from "../DeleteTaskConfirm/DeleteTask";

const TaskCard = ({
  id,
  title,
  description,
  deadline,
  category,
  categoryColor,
  icon,
  status,
  priority,
  onToggleStatus,
  onDelete
}) => {
  const [modalType, setModalType] = useState(null); // 'edit' | 'delete' | null

  const openEditModal = () => setModalType("edit");
  const openDeleteModal = () => setModalType("delete");
  const closeModal = () => setModalType(null);

  const deleteTask = () => {
    console.log("deleted");
    onDelete(id);
    closeModal();
  };

  return (
    <div
      className="task-card"
      style={{ borderLeft: `6px solid ${categoryColor}` }}
    >
      <div className="task-card__left">
        <span
          className="task-card__icon"
          style={{
            backgroundColor: `${categoryColor}20`, // render more transparent, works badly with black tho?
            color: categoryColor,
          }}
          role="img"
          aria-label={icon}
        >
          {icon}
        </span>
        <div
          className="task-card__category"
          style={{ backgroundColor: categoryColor }}
        >
          {category}
        </div>
      </div>
      <div className="task-card__text">
        <h3 className="task-card__title">{title}</h3>
        <p className="task-card__desc">{description}</p>
        <p className="task-card__deadline">
          {new Date(deadline).toISOString().split("T")[0]} 
        </p>
      </div>
      <div className="buttons__section">
        <button onClick={openEditModal}>
          <img src={editIcon} alt="Edit icon" className="editIcon" />
        </button>
        <button onClick={openDeleteModal}>
          <img src={deleteIcon} alt="Delete icon" className="deleteIcon" />
        </button>

        <button
          className={`task-card__check ${status === "done" ? "checked" : ""}`}
          onClick={() => onToggleStatus(id, status)}
          aria-label="Toggle status"
        >
          {status === "done" ? "✅" : "⭕"}
        </button>
      </div>

      {modalType === "edit" && (
        <Modal title="Edit Task" isOpen={true} onClose={closeModal}>
          <EditTaskForm 
          taskId = {id}
          taskData ={{
            title: title,
            description: description,
            due_date: deadline,
            priority: priority,
          }}

          onSuccess={closeModal} />
        </Modal>
      )}

      {modalType === "delete" && (
        <Modal title="Delete Task?" isOpen={true} onClose={closeModal}>
          <DeleteConfirm
            message="Are you sure you want to delete this task? This cannot be undone."
            confirmText="Delete Task"
            cancelText="Cancel"
                onConfirm={deleteTask}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskCard;
