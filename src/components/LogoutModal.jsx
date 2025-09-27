// src/components/LogoutModal.jsx
import Modal from "react-modal";
import '../assets/styles/LogoutModal.css';
import logout from "../../public/images/logout.png";
import close from "../../public/icons/close.png";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ isOpen, onClose }) {
    const navigator = useNavigate();

    const handleLogout = () => {
        localStorage.clear();            
        onClose();                      
        navigator("/");                 
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            ariaHideApp={false}
            className="LogoutModal"
            overlayClassName="LogoutOverlay"
        >
            <div className="Logout-Modal-Box">
                <img src={logout} alt="logout-main-img" />
                <img src={close} alt="닫기" onClick={onClose} />
                <p>로그아웃 하시겠습니까?</p>
                <button onClick={handleLogout}>로그아웃 하기</button>
            </div>
        </Modal>
    );
}
