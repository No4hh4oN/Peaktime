// components/JoinModal.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from "../api/auth";
import {
    joinUser,
    checkId,
    checkEmail,
    checkStudentId,
} from "../api/user";
import ErrorModal from "./error";
import Modal from "react-modal";
import festaTitle from "/images/festaTitle.png";
import closeModal from "/icons/close.png";
import toggledown from "/icons/toggledown.png";
import "../assets/styles/modal.css";

Modal.setAppElement("#root");

export default function JoinModal({ isOpen, onRequestClose }) {
    const navigator = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const openError = (msg) => setErrorMessage(msg);
    const closeError = () => setErrorMessage("");
    const [form, setForm] = useState({
        userId: "",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        studentId: "",
        department: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    // id 체크
    const [isCheckId, setCheckId] = useState(null);
    const handleCheckId = async () => {
        try {
            const res = await checkId(form.userId);

            if (res.duplicated) {
                openError("중복된 아이디입니다.");
                setCheckId(false);
                setForm((f) => ({ ...f, userId: "" }));
            } else {
                setCheckId(true);
            }
        } catch (e) {
            openError("아이디 중복 확인 실패");
        }
    };

    // email 체크
    const [isCheckEmail, setCheckEmail] = useState(null);
    const handleCheckEmail = async () => {
        try {
            const res = await checkEmail(form.email);

            if (res.duplicated) {
                openError("사용 중인 이메일입니다.");
                setCheckEmail(false);
                setForm((f) => ({ ...f, email: "" }));
            } else {
                setCheckEmail(true);
            }
        } catch (err) {
            openError("이메일 중복 확인 중 오류 발생");
        }
    };


    // 학번 체크
    const [isCheckStudentId, setCheckStudentId] = useState(null);
    const handleCheckStudentId = async () => {
        try {
            const res = await checkStudentId(form.studentId);
            if (res.duplicated) {
                openError(res.message);
                setCheckStudentId(false);
                setForm((f) => ({ ...f, email: "" }));
            } else {
                setCheckStudentId(true);
            }
        } catch (e) {
            openError("학번 중복 확인 실패");
        }
    };

    // 비밀번호 체크
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState(null);

    // 비밀번호 형식 체크 (영문, 숫자, 기호 4~20자)
    const validatePassword = (password) => {
        const regex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{4,20}$/;
        return regex.test(password);
    };

    // 실시간 비밀번호 형식 체크
    useEffect(() => {
        if (!form.password) {
            setPasswordMessage("");
        } else if (!validatePassword(form.password)) {
            setPasswordMessage(false);
        } else {
            setPasswordMessage(true);
        }
    }, [form.password]);

    // 비밀번호 확인
    useEffect(() => {
        if (!form.confirmPassword) {
            setConfirmMessage("");
        } else if (form.confirmPassword !== form.password) {
            setConfirmMessage(false);
        } else {
            setConfirmMessage(true);
        }
    }, [form.confirmPassword, form.password]);

    // 회원가입
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { confirmPassword, ...submitForm } = form;

            const res = await joinUser({
                ...submitForm,
                role: "USER",
                createdAt: new Date().toISOString(),
            });

            // 회원가입시 자동으로 로그인되도록 로그인 로직 재호출
            const loginRes = await login({
                identifier: form.userId,
                password: form.password,
            });
            localStorage.setItem("accessToken", loginRes.token);
            localStorage.setItem("userRole", loginRes.role);

            setForm({
                userId: "",
                email: "",
                password: "",
                confirmPassword: "",
                name: "",
                studentId: "",
                department: "",
            });

            alert("회원가입 성공!");
            onRequestClose();
            navigator('/MainPage');
        } catch (err) {
            openError("회원가입 중 오류 발생");
        }
    };

    // 학과선택 토글
    // 학과 리스트
    const departments = [
        "신학과", "간호학과", "약학과", "경영학과", "글로벌한국학과",
        "영어영문학과", "상담심리학과", "유아교육과", "항공관광외국어학부", "사회복지학과",
        "음악학과", "아트앤디자인학과", "체육학과", "자유전공학부", "물리치료학과",
        "보건관리학과", "식품영양학과", "동물자원과학과", "바이오융합공학과", "화학생명과학과",
        "환경디자인원예학과", "인공지능융합학부", "컴퓨터공학부", "건축학과(5년제)",
        "건축학과(4년제)", "데이터클라우드공학과"
    ];
    const [isDeptOpen, setDeptOpen] = useState(false);

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
                <div className={`input-with-btn ${isDeptOpen ? "open" : ""}`}>
                    <input
                        className={`joinInput ${isDeptOpen ? "open" : ""}`}
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        placeholder="학과 선택하기"
                        readOnly
                        onClick={() => setDeptOpen(!isDeptOpen)}
                    />
                    <img
                        className={`toggleDown ${isDeptOpen ? "open" : ""}`}
                        src={toggledown}
                        alt="학과 선택"
                        onClick={() => setDeptOpen(!isDeptOpen)}
                    />
                    {isDeptOpen && (
                        <div className="dept-dropdown">
                            <hr className="deptLine" />
                            {departments.map((dept) => (
                                <span
                                    key={dept}
                                    onClick={() => {
                                        setForm((f) => ({ ...f, department: dept }));
                                        setDeptOpen(false);
                                    }}
                                >
                                    {dept}
                                </span>
                            ))}
                        </div>
                    )}
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
                    {isCheckStudentId === true && (
                        <span id="ok" className="systemMessage">*가입 가능한 학번입니다.</span>
                    )}
                    {isCheckStudentId === false && (
                        <span id="error" className="systemMessage">*이미 가입한 학번입니다.</span>
                    )}
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
                    {isCheckEmail === true && (
                        <span id="ok" className="systemMessage">*가입 가능한 주소입니다.</span>
                    )}
                    {isCheckEmail === false && (
                        <span id="error" className="systemMessage">*이미 가입한 주소입니다.</span>
                    )}
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
                    <span className="idNotice">*4~20자 영문, 숫자만 가능합니다.</span>
                    {isCheckId === true && (
                        <span id="ok" className="systemMessage">*사용 가능한 ID 입니다.</span>
                    )}
                    {isCheckId === false && (
                        <span id="error" className="systemMessage">*중복된 아이디입니다.</span>
                    )}
                </div>


                <div id="pwInput" className="input-with-btn">
                    <input
                        className="joinInput"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                    {passwordMessage ? (
                        <span id="ok" className="systemMessage">*가입 가능한 비밀번호 입니다.</span>
                    ) : (
                        <span id="error" className="systemMessage">*비밀번호 조건을 확인해주세요.</span>
                    )}
                </div>
                <div className="input-with-btn">
                    <input
                        className="joinInput"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="비밀번호 확인"
                    />
                    {confirmMessage ? (
                        <span id="ok" className="systemMessage">*비밀번호가 일치합니다.</span>
                    ) : (
                        <span id="error" className="systemMessage">*비밀번호가 일치하지 않습니다.</span>
                    )}
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
