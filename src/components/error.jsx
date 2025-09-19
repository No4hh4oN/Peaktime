import Modal from "react-modal";
import warningIcon from "/icons/warning.png";
import closeModal from "/icons/close.png";
import "../assets/styles/error.css";

Modal.setAppElement("#root");

export default function ErrorModal({ isOpen, onClose, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="error-modal-content"
      overlayClassName="error-modal-overlay"
    >
      <div className="error-box">
        <img src={warningIcon} alt="경고" className="error-icon" />
        <p className="error-message">{message}</p>
        <img src={closeModal} alt="close" className="closeErrorModal" onClick={onClose}/>
      </div>
    </Modal>
  );
}