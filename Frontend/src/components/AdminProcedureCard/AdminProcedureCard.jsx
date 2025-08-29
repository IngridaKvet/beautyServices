import "./procedureCard.css";
import { renderStars } from "../../utils/renderStars";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { updateData } from "../../services/update";
import { deleteData } from "../../services/delete";

const API_URL = import.meta.env.VITE_API_URL;

const AdminProcedureCard = ({ procedure, fetchItems }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openModal = () => setAddModalOpen(true);
  const closeModal = () => setAddModalOpen(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //formos laukai uzpildyti
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (procedure) {
      setValue("name", procedure.name);
      setValue("category_id", procedure.category_id);
      setValue("duration", procedure.duration);
      setValue("img_url", procedure.img_url);
    }
  }, [procedure, setValue]);

  const handleDelete = async () => {
    try {
      const response = await deleteData(`procedures/${procedure.id}`);
      console.log(response);
      toast.success("Procedure deleted!");
      setSubmitting(true);
    } catch (error) {
      setError(error.message);
      toast.error("Deleting procedure failed.");
    } finally {
      setLoading(false);
      setSubmitting(false);
      closeModal();
      fetchItems();
    }
  };

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await updateData(`procedures/${procedure.id}`, formdata);
      console.log(response);
      toast.success("Procedure updated!");
      setSubmitting(true);
    } catch (error) {
      setError(error.message);
      toast.error("Updating procedure failed.");
    } finally {
      setLoading(false);
      setSubmitting(false);
      closeModal();
      fetchItems();
    }
  };

  return (
    <div className="procedureCard">
      <div>
        <h3>{procedure.name}</h3>
        <p>{procedure.duration}</p>
        <p>{procedure.category}</p>
        <p>{renderStars(procedure.average_rating)}</p>
        <p>{procedure.average_rating}</p>
        <button
          className="registerButton"
          onClick={() => openModal()}
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update procedure"}
        </button>
        <button
          className="registerButton"
          onClick={handleDelete}
          disabled={submitting}
        >
          {submitting ? "Deleting..." : "Delete procedure"}
        </button>
      </div>
      <Modal
        title="Update new procedure"
        isOpen={isAddModalOpen}
        onClose={() => closeModal()}
      >
        <div className="modal__content">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form__input">
              <label>Name</label>
              <input
                type="text"
                {...register("name")}
                className="form__inputfield"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="form__input">
              <label>Category id</label>
              <input
                type="number"
                {...register("category_id")}
                className="form__inputfield"
              />
              {errors.category_id && (
                <p className="text-red-500 text-sm">
                  {errors.category_id.message}
                </p>
              )}
            </div>
            <div className="form__input">
              <label>Duration</label>
              <input
                type="text"
                {...register("duration")}
                className="form__inputfield"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>
            <div className="form__input">
              <label>Image Url</label>
              <input
                type="text"
                {...register("img_url")}
                className="form__inputfield"
              />
              {errors.img_url && (
                <p className="text-red-500 text-sm">{errors.img_url.message}</p>
              )}
            </div>
            <div className="error__bar">{error}</div>
            <button type="submit" className="registerButton" disabled={loading}>
              {loading ? "Updating..." : "Update procedure"}
            </button>
          </form>
          <button onClick={closeModal} className="closeButton">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProcedureCard;
