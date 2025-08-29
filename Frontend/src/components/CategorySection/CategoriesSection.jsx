import "./categoriesSection.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import { TasksContext } from "../../contexts/contexts";
import { deleteData } from "../../services/delete";
import notFoundIllustration from "../../assets/noData.png";
import toast from "react-hot-toast";

const CategoriesSection = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openModal = () => setAddModalOpen(true);
  const closeModal = () => setAddModalOpen(false);

  const { categories, setCategories } = useContext(TasksContext);
  const { tasks } = useContext(TasksContext);

  const handleDeleteCategory = async (id) => {
    try {
      await deleteData(`categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Category deleted!");
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="categoriesSection">
      <div className="categoriesSection__header">
        <h2 className="categoriesSection-headline">My Categories</h2>
        <button className="addCategoryBtn" onClick={() => openModal()}>
          Add new Category
        </button>
      </div>

      <Modal
        title="Add New Category"
        isOpen={isAddModalOpen}
        onClose={() => closeModal()}
      >
        <AddCategoryForm onSuccess={closeModal} />
      </Modal>

      <div className="categoryCards__container">
        {categories && categories.length > 0 ? (
          categories.map((category) => {
            console.log(tasks)
            const taskCount =
              tasks?.filter(
                (task) => task.category_id === category.id
              ).length || 0;

            return (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.category_name}
                taskCount={taskCount}
                color={category.category_color}
                icon={category.category_icon}
                onDelete={handleDeleteCategory}
              />
            );
          })
        ) : (
          <div className="notFound__section">
            <img src={notFoundIllustration} alt="" className="notFound__img" />
            <p>No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
