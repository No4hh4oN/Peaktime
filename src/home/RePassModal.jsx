/* eslint-disable no-unused-vars */
import { useState } from "react";
import Modal from "react-modal";
import AxiosClient from "../AxiosClinet";
import "./RePassModal.css";
import close from "/icons/close.png";
import festaTitle from "/images/festaTitle.png";

Modal.setAppElement("#root");

export default function RePassModal({ isOpen, onRequestClose }) {
    const [form, setForm] = useState({
        userId: "",
        studentId: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // API 요청 먼저 실행
            await AxiosClient.post("/users/reset-password", form);

            // 4초 동안 로딩 유지
            setTimeout(() => {
                setLoading(false);
                alert("임시 비밀번호가 발급되었습니다. 메일을 확인하세요!");
                onRequestClose();
            }, 4000);
        } catch (err) {
            console.error(err);
            setLoading(false);
            alert("발급에 실패했습니다. 입력 정보를 확인해주세요.");
        }
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="repass-modal-box"
            overlayClassName="repass-modal-overlay"
        >
            <img src={festaTitle} alt="" className="rp-festa-img" />
            <img
                src={close}
                alt="닫기"
                className="rp-close-img"
                onClick={onRequestClose}
            />
            <span className="rp-title">임시 비밀번호 만들기</span>

            {loading ? (
                <div className="rp-loading">
                    <div className="rp-spinner"></div>
                </div>
            ) : (
                <>
                    <div className="repass-form">
                        <label>
                            <input
                                placeholder="아이디 입력"
                                type="text"
                                name="userId"
                                value={form.userId}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <input
                                placeholder="학번 입력"
                                type="text"
                                name="studentId"
                                value={form.studentId}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <input
                                placeholder="이메일 입력"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <span className="rp-alert-text">
                        해당 이메일로 임시 비밀번호가 전송됩니다. <br />
                        메일 수신까지 최대 3분 정도 소요될 수 있습니다.
                    </span>

                    <button className="rp-submit-btn" onClick={handleSubmit}>
                        임시 비밀번호 생성
                    </button>
                </>
            )}
        </Modal>
    );
}
