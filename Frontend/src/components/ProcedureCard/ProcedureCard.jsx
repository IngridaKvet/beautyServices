import "./procedureCard.css";
import { renderStars } from "../../utils/renderStars";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/contexts";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import Select from "react-select";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import { postData } from "../../services/post";

const ProcedureCard = ({ procedure, fetchItems }) => {
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openModal = () => setAddModalOpen(true);
  const closeModal = () => setAddModalOpen(false);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const ratingOptions = [
    { value: 5, label: "★★★★★ (5)" },
    { value: 4, label: "★★★★☆ (4)" },
    { value: 3, label: "★★★☆☆ (3)" },
    { value: 2, label: "★★☆☆☆ (2)" },
    { value: 1, label: "★☆☆☆☆ (1)" },
  ];
  const [rating, setRating] = useState(ratingOptions[0]);

  async function fetchDates() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/dates/${procedure.id}`, {
        withCredentials: true,
      });
      const data = res.data.data;

      const options = data.map((d) => ({
        value: d.date,
        label: new Date(d.date).toLocaleDateString("lt-LT"),
      }));

      setDates(options);
    } catch (error) {
      setError(error.message);
      setDates([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDates();
  }, []);

  const handleRating = async () => {
    try {
      setSubmitting(true);
      setError("");

      const body = {
        user_id: user.id,
        procedure_id: procedure.id,
        rating: rating.value,
      };

      const res = await axios.post(`${API_URL}/rating`, body, {
        withCredentials: true,
      });

      console.log(res);
    } catch (error) {
      const errors = error.response?.data?.errors;
      setError(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Adding review failed. Please try later.")
      );
    } finally {
      setSubmitting(false);
      fetchItems();
    }
  };

  const handleRegister = async () => {
    try {
      const response = await postData(`procedures/${procedure.id}`);
      console.log(response);
      toast.success("Registration succesful!");
      setSubmitting(true);
    } catch (error) {
      setError(error.message);
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
      setSubmitting(false);
      closeModal();
    }
  };

  return (
    <div className="procedureCard">
      <img
        src={procedure.img_url}
        alt={procedure.name}
        className="procedure_img"
      />
      <div>
        <h3>{procedure.name}</h3>
        <button className="registerButton" onClick={() => openModal()}>
          Register
        </button>
        <p>{procedure.duration}</p>
        <p>{procedure.category}</p>
        <p>{renderStars(procedure.average_rating)}</p>
        <p>{procedure.average_rating}</p>
        <Select
          inputId="ratingSelect"
          options={ratingOptions}
          value={rating}
          onChange={setRating}
          placeholder="Choose rating..."
        />
        <button
          className="registerButton"
          onClick={handleRating}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit rating"}
        </button>
      </div>
      <Modal
        title="Pick a date for your appointment"
        isOpen={isAddModalOpen}
        onClose={() => closeModal()}
      >
        <div className="modal__content">
          <Select
            inputId="dateSelect"
            options={dates}
            value={selectedDate}
            onChange={console.log("unfinished")}
            placeholder="Choose date..."
          />
        </div>
        <button
          className="registerButton"
          onClick={handleRegister}
          disabled={submitting}
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </Modal>
    </div>
  );
};

export default ProcedureCard;
