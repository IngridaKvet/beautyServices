import "./categoryCard.css";
import editIcon from "../../assets/editIcon.png";
import deleteIcon from "../../assets/delete.png";
import { useState } from "react";
import Modal from "../Modal/Modal";
import DeleteConfirm from "../DeleteTaskConfirm/DeleteTask";
import EditCategoryForm from "../EditCategoryForm/EditCategoryForm";

const CategoryCard = ({ id, color, icon, name, taskCount, onDelete }) => {
  const [modalType, setModalType] = useState(null); // 'edit' | 'delete' | null
  const openEditModal = () => setModalType("edit");
  const openDeleteModal = () => setModalType("delete");
  const closeModal = () => setModalType(null);

  const deleteCategory = () => {
    console.log("deleted");
    onDelete(id);
    closeModal();
  };

  return (
    <div className="category-card" style={{ borderLeft: `6px solid ${color}` }}>
      <div className="card__left">
        <div className="category-card__icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div className="category-card__details">
          <h3 className="category-card__name">{name}</h3>
          <p className="category-card__count">{taskCount} Tasks</p>
        </div>
      </div>
      <div className="buttons__section">
        <button onClick={openEditModal}>
          <img src={editIcon} alt="Edit icon" className="editIcon" />
        </button>
        <button onClick={openDeleteModal}>
          <img src={deleteIcon} alt="Delete icon" className="deleteIcon" />
        </button>
      </div>

      {modalType === "edit" && (
        <Modal title="Edit Category" isOpen={true} onClose={closeModal}>
          <EditCategoryForm
            categoryId={id}
            categoryData={{
              category_name: name,
              category_color: color,
              category_icon: icon,
            }}
            onSuccess={closeModal}
          />
        </Modal>
      )}

      {modalType === "delete" && (
        <Modal title="Delete Category?" isOpen={true} onClose={closeModal}>
          <DeleteConfirm
            message="Are you sure you want to delete this category? This cannot be undone."
            confirmText="Delete Category"
            cancelText="Cancel"
            onConfirm={deleteCategory}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default CategoryCard;
