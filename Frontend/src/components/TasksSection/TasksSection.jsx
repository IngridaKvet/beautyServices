import "./tasksSection.css";
import TaskCard from "../TaskCard/TaskCard";
import TaskFilters from "../Filter/Filter";
import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { TasksContext } from "../../contexts/contexts";
import notFoundIllustration from "../../assets/noData.png";
import { deleteData } from "../../services/delete";
import { updateData } from "../../services/update";

import toast from "react-hot-toast";

const TasksSection = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openModal = () => setAddModalOpen(true);
  const closeModal = () => setAddModalOpen(false);

  const { tasks, setTasks } = useContext(TasksContext);

  const handleDeleteTask = async (id) => {
    try {
      await deleteData(`tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted!");
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleToggleStatus = async (id, status) => {
 const newStatus = status === "done" ? "todo" : "done";

  try {
    await updateData(`tasks/${id}`, { status: newStatus }); 

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to toggle task status", err);
  }
  };

  const [filters, setFilters] = useState({
    dueDate: "",
    priority: "",
    category: "",
    status: "",
  });

  return (
    <div className="tasksSection">
      <div className="tasksSection__header">
        <h2 className="tasksSection-headline">My tasks</h2>
        <button className="addTaskBtn" onClick={() => openModal()}>
          Add new Task
        </button>
      </div>

      <Modal
        title="Add New Task"
        isOpen={isAddModalOpen}
        onClose={() => closeModal()}
      >
        <AddTaskForm onSuccess={closeModal} />
      </Modal>

      <TaskFilters filters={filters} setFilters={setFilters} />

      <div className="task__wrapper">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              category={task.category_name}
              categoryColor={task.category_color}
              icon={task.category_icon}
              status={task.status}
              priority={task.priority}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          ))
        ) : (
          <div className="notFound__section">
            <img src={notFoundIllustration} alt="" className="notFound__img" />
            <p>No tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksSection;

