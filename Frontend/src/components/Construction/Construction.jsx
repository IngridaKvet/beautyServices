import "./construction.css";

import constructionIllustration from "../../assets/construction.png";
import { useState } from "react";
import Modal from "../Modal/Modal";

const Construction = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openModal = () => setAddModalOpen(true);
  const closeModal = () => setAddModalOpen(false);

  return (
    <div className="construction__section">
      <img
        src={constructionIllustration}
        alt=""
        className="construction__img"
      />
      <h2 className="construction__headline">Under construction...</h2>
      <button className="construction__btn" onClick={() => openModal()}>
        Learn more
      </button>

      <Modal
        title="Under construction"
        isOpen={isAddModalOpen}
        onClose={() => closeModal()}
      >
        <div className="modal__content">
          <p>
            This page is under construction. Since I overestimated my ability to
            make all features all at once, please evaluate the signup, login,
            tasks and categories pages. In this page I had planned to add light
            dark theme toggler and user settings allowing to change username and
            password.
          </p>
          <button onClick={closeModal} className="close__btn">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Construction;
