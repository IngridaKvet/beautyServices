import "./editCategoryForm.css";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { updateData } from "../../services/update";
import { TasksContext } from "../../contexts/contexts";

const EditCategoryForm = ({ categoryId, categoryData, onSuccess }) => {
  const [error, setError] = useState("");
  const { categories, setCategories } = useContext(TasksContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (formdata) => {
    console.log(categoryData.id);
    try {
      await updateData(`categories/${categoryId}`, formdata);

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, ...formdata } : cat
        )
      );

      const updatedCategories = categories.map((cat) =>
        cat.id === categoryId ? { ...cat, ...formdata } : cat
      );
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      onSuccess();
      toast.success("Category edited!");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (categoryData) {
      setValue("category_name", categoryData.category_name);
      setValue("category_color", categoryData.category_color);
      setValue("category_icon", categoryData.category_icon);
    }
  }, [categoryData, setValue]);

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
          Edit Category
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
