import "./addCategoryForm.css";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { postData } from "../../services/post";
import toast from "react-hot-toast";
import { TasksContext } from "../../contexts/contexts";

const AddCategoryForm = ({ onSuccess }) => {
  const [error, setError] = useState("");
  const { categories, setCategories } = useContext(TasksContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const response = await postData("categories", formdata);

      const newCategory = response.new_category;

      setCategories((prev) => [...prev, newCategory]);

      localStorage.setItem(
        "categories",
        JSON.stringify([...categories, newCategory])
      );

      onSuccess();
      toast.success("Category created!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="addCategoryForm">
        {/* Category name*/}
        <div className="form__input">
          <label htmlFor="name" className="form__title">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("category_name")}
            className="form__inputfield"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Color */}
        <div className="form__input">
          <label htmlFor="color">Color</label>
          <input type="color" id="color" {...register("category_color")} />
          {errors.color && (
            <p className="text-red-500 text-sm">{errors.color.message}</p>
          )}
        </div>

        {/* Icon */}
        <div className="form__input">
          <label htmlFor="icon" className="form__title">
            Icon
          </label>
          <input
            id="icon"
            type="text"
            {...register("category_icon")}
            className="form__inputfield"
          />
          {errors.icon && (
            <p className="text-red-500 text-sm">{errors.icon.message}</p>
          )}
        </div>

        <div className="error__bar">{error}</div>
        <button type="submit" className="addCategoryForm__btn">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
