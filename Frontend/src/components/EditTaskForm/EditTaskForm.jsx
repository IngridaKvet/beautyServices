import "./editTaskForm.css";
import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import { TasksContext } from "../../contexts/contexts";
import { updateData } from "../../services/update";
import toast from "react-hot-toast";

const EditTaskForm = ({ taskId, taskData, onSuccess }) => {
  const [error, setError] = useState("");
  const { tasks, setTasks } = useContext(TasksContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      console.log(taskId);
      formdata.deadline = new Date(formdata.due_date).toISOString();
      delete formdata.due_date;
     
      await updateData(`tasks/${taskId}`, formdata);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...formdata } : task
        )
      );

      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...formdata } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      onSuccess();
      toast.success("Task edited!");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (taskData) {
      setValue("title", taskData.title);
      setValue("description", taskData.description);
      const formattedDate = new Date(taskData.due_date)
        .toISOString()
        .split("T")[0];
      setValue("due_date", formattedDate);
      setValue("priority", taskData.priority);
    }
  }, [taskData, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="editTaskForm">
        <div className="form__input">
          <label htmlFor="title" className="form__title">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="form__inputfield"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="form__input">
          <label htmlFor="desc" className="form__title">
            Description
          </label>
          <input
            id="desc"
            type="text"
            {...register("description")}
            className="form__inputfield"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="form__input">
          <label htmlFor="due_date" className="form__title">
            Due Date
          </label>
          <input
            id="due_date"
            type="date"
            {...register("due_date")}
            className="form__inputfield"
          />
        </div>

        <div className="form__input">
          <label htmlFor="priority" className="form__title">
            Priority
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="form__inputfield"
            defaultValue=""
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="error__bar">{error}</div>
        <button type="submit" className="editTaskForm__btn">
          Edit Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskForm;
