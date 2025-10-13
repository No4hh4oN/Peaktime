/* eslint-disable no-unused-vars */
// components/LoginModal.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../api/auth";
import ErrorModal from "./error";
import Modal from "react-modal";
import festaTitle from "/images/festaTitle.png";
import closeModal from "/icons/close.png";
import "../assets/styles/modal.css";

Modal.setAppElement("#root");

export default function LoginModal({ isOpen, onRequestClose }) {
    const navigator = useNavigate();
    const [errorOpen, setErrorOpen] = useState(false);
    const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });

    const handleChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    // 로그인
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const res = await login(loginForm);
            localStorage.setItem("accessToken", res.token);
            localStorage.setItem("userRole", res.role);
            setLoginForm((f) => ({ identifier: "", password: "" }));
            
            onRequestClose();
            navigator('/MainPage');
        } catch (err) {
            setErrorOpen(true);
            console.error(err)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <img id="mini" src={festaTitle} alt="festaTitle" />
            <p className="loginP">로그인하고 천보축전의 모든 순간을 함께해요!</p>
            <form className="loginForm" onSubmit={handleLogin}>
                <input
                    className="loginInput"
                    type="text"
                    name="identifier"
                    value={loginForm.identifier}
                    onChange={handleChange}
                    placeholder="아이디 입력"
                />
                <input
                    className="loginInput"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    placeholder="비밀번호 입력"
                />
                <button className="loginSubmit" type="submit">로그인</button>
            </form>
            <img src={closeModal} alt="closeModal" className="closeModal" onClick={onRequestClose} />

            <ErrorModal
                isOpen={errorOpen}
                onClose={() => setErrorOpen(false)}
                message="입력하신 정보를 다시 확인해주세요!"
            />
        </Modal>
    );
}
