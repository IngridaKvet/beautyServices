import Navigation from "../../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "./adminPage.css";
import Modal from "../../components/Modal/Modal";
import AdminProcedureCard from "../../components/AdminProcedureCard/AdminProcedureCard";
const DEFAULT_FILTERS = { category: "" };
import { useForm } from "react-hook-form";
import { postData } from "../../services/post";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openModal = () => setAddModalOpen(true);
  const closeModal = () => setAddModalOpen(false);
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function fetchItems() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/procedures`, {
        withCredentials: true,
      });
      const data = res.data.data;

      console.log(data);
      setProcedures(data);
    } catch (error) {
      setError(error.message);
      setProcedures([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const onSubmit = async (formdata) => {
    setLoading(true);
    try {
      const response = await postData("procedures", formdata);
      console.log(response);
      toast.success("Procedure added!");
      setSubmitting(true);
    } catch (error) {
      setError(error.message);
      toast.error("Adding procedure failed.");
    } finally {
      setLoading(false);
      setSubmitting(false);
      closeModal();
      fetchItems();
    }
  };

  return (
    <>
      <div className="itemsPage">
        <Navigation />
        <section className="items">
          <button
            className="registerButton"
            onClick={() => openModal()}
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add procedure"}
          </button>
          {loading && <p>Loading…</p>}
          {!loading && error && <p className="error">{error}</p>}
          {procedures.length === 0 ? (
            <p className="no-items">
              We couldn’t find any procedures right now. Please check back
              later.
            </p>
          ) : (
            procedures.map((procedure) => (
              <AdminProcedureCard
                key={procedure.id}
                procedure={procedure}
                fetchItems={fetchItems}
              />
            ))
          )}
        </section>
      </div>
      <Modal
        title="Add new procedure"
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
              {loading ? "Adding..." : "Add procedure"}
            </button>
          </form>
          <button onClick={closeModal} className="closeButton">
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AdminPage;
