import "./addTaskForm.css";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { TasksContext } from "../../contexts/contexts";
import { postData } from "../../services/post";
import toast from "react-hot-toast";

const AddTaskForm = ({ onSuccess }) => {
  const [error, setError] = useState("");
  const { categories, tasks, setTasks } = useContext(TasksContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const response = await postData("tasks", formdata);
      const newTask = response.new_task;
      const category = categories.find(
        (cat) => cat.id === parseInt(formdata.category_id)
      );

      const newTaskFullInfo = {
        ...newTask,
        category_name: category?.category_name || "",
        category_color: category?.category_color || "",
        category_icon: category?.category_icon || "",
      };

      setTasks((prev) => [...prev, newTaskFullInfo]);

      localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, newTaskFullInfo])
      );

      console.log(response);

      onSuccess();
      toast.success("Task added!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="addTaskForm">
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
            {...register("deadline")}
            className="form__inputfield"
          />
        </div>

        <div className="form__input">
          <label htmlFor="category" className="form__title">
            Category
          </label>
          <select
            id="category"
            {...register("category_id")}
            className="form__inputfield"
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
          </select>
        </div>

        <div className="form__input">
          <label htmlFor="priority" className="form__title">
            Priority
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="form__inputfield"
            defaultValue="medium"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="error__bar">{error}</div>
        <button type="submit" className="addTaskForm__btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
