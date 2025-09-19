// components/JoinModal.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    joinUser,
    checkId,
    checkEmail,
    checkStudentId,
    userMe,
    resetPassword,
} from "../api/user";
import ErrorModal from "./error";
import Modal from "react-modal";
import festaTitle from "/images/festaTitle.png";
import closeModal from "/icons/close.png";
import "../assets/styles/modal.css";

Modal.setAppElement("#root");

export default function JoinModal({ isOpen, onRequestClose }) {
    const [errorMessage, setErrorMessage] = useState("");
    const openError = (msg) => setErrorMessage(msg);
    const closeError = () => setErrorMessage("");
    const [form, setForm] = useState({
        userId: "",
        email: "",
        password: "",
        name: "",
        studentId: "",
        department: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    // id 체크
    const handleCheckId = async () => {
        try {
            const res = await checkId(form.userId);

            console.log(res)
            if (res.duplicated) {
                openError("중복된 아이디입니다.");
                setForm((f) => ({ ...f, userId: "" }));
            } else {
                alert("사용 가능한 아이디입니다.");
            }
        } catch (e) {
            openError("아이디 중복 확인 실패");
        }
    };

    // email 체크
    const handleCheckEmail = async () => {
        try {
            const res = await checkEmail(form.email);

            if (res.duplicated) {
                openError("사용 중인 이메일입니다.");
                setForm((f) => ({ ...f, email: "" }));
            } else {
                alert("사용 가능한 이메일입니다.");
            }
        } catch (err) {
            openError("이메일 중복 확인 중 오류 발생");
        }
    };


    // 학번 체크
    const handleCheckStudentId = async () => {
        try {
            const res = await checkStudentId(form.studentId);
             if (res.duplicated) {
                openError(res.message);
                setForm((f) => ({ ...f, email: "" }));
            } else {
                alert("사용 가능한 학번입니다.");
            }
        } catch (e) {
            openError("학번 중복 확인 실패");
        }
    };

    // 회원가입
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await joinUser({
                ...form,
                role: "USER",
                createdAt: new Date().toISOString(),
            });
            setForm({
                userId: "",
                email: "",
                password: "",
                name: "",
                studentId: "",
                department: "",
            });
        } catch (err) {
            openError("회원가입 중 오류 발생");
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
            <p className="joinP">
                지금 가입하고 천보축전의<br />
                새로운 여정을 시작해보세요!
            </p>
            <form id="joinForm" className="joinForm" onSubmit={handleSubmit}>

                <div className="input-with-btn">
                    <input
                        className="joinInput"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        placeholder="학과 선택하기"
                    />
                </div>
                <div className="input-with-btn">
                    <input
                        className="joinInput"
                        name="studentId"
                        value={form.studentId}
                        onChange={handleChange}
                        placeholder="학번 입력"
                    />
                    <button className="dupCheck" type="button" onClick={handleCheckStudentId}>중복 확인</button>
                </div>

                <div id="emailInput" className="input-with-btn">
                    <input
                        className="joinInput"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="이메일 입력"
                    />
                    <button className="dupCheck" type="button" onClick={handleCheckEmail}>중복 확인</button>
                </div>

                <div className="input-with-btn">
                    <input
                        className="joinInput"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="이름 입력"
                    />
                </div>

                <div className="input-with-btn">
                    <input
                        className="joinInput"
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="아이디 입력"
                    />
                    <button className="dupCheck" type="button" onClick={handleCheckId}>중복 확인</button>
                </div>
                <span className="idNotice">*4~20자 영문, 숫자만 가능합니다.</span>

                <div id="pwInput" className="input-with-btn">
                    <input
                        className="joinInput"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                </div>
                <div className="input-with-btn">
                    <input
                        className="joinInput"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호 확인"
                    />
                </div>

            </form>
            <p id="privacyInfo">
                축제가 종료된 후, <br />
                수집된 모든 개인정보는 안전하게 폐기됩니다.
            </p>
            <button className="joinSubmit" type="submit" form="joinForm">계정 만들기</button>
            <img src={closeModal} alt="closeModal" className="closeModal" onClick={onRequestClose} />

            <ErrorModal
                isOpen={!!errorMessage}
                onClose={closeError}
                message={errorMessage}
            />
        </Modal>
    );
}
