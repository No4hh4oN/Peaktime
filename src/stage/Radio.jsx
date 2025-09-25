/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from '../components/header';
import '../assets/styles/common.css';
import './Radio.css';
import noCheck from '/icons/Nocheck.png';
import check from '/icons/check.png';
import radio from '/images/radio.png';
import submit from '/images/submit.png';
import AxiosClient from "../AxiosClinet";
import Modal from "react-modal";
import close from '/icons/close.png';


Modal.setAppElement("#root");


export default function Radio() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isAnonymous, setIsAnonymous] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const toggleAnonymous = () => {
        setIsAnonymous((prev) => !prev);
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 모두 입력해주세요.");
            return; // 요청중단
        }
        try {
            const data = {
                anonymous: isAnonymous,
                title: title,
                content: content,
            };

            const response = await AxiosClient.post("/stories", data, { auth: true });
            console.log("사연 제출 성공:", response);

            setTitle("");
            setIsModalOpen(true);
            setContent("");
            setIsAnonymous(false);
        } catch (error) {
            console.error("사연 제출 실패:", error);
            alert("사연 제출에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
            <div id='Radio' className="MyPageAlways">
                <Header />
                <div className='Radio'>
                    <div className='Radio-Box'>
                        <div className='Radio-Title'>
                            <img src={radio} alt="radio-img" />
                            <span>사연라디오</span>
                        </div>

                        <div className='Radio-NoName' onClick={toggleAnonymous} style={{cursor: "pointer"}}>
                            <img src={isAnonymous ? check : noCheck} alt="toggle-check" />
                            <div className='Radio-NoName-text'>
                                <span style={{ color: isAnonymous ? "#4A9BF6" : "#464C52" }}>
                                    익명
                                </span>
                                으로 제보하기
                            </div>
                        </div>

                        <div className='Radio-Write-Box'>
                            <input
                                type="text"
                                placeholder='사연의 제목을 적어주세요.'
                                className='Radio-input-title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className='Radio-input-contents'
                                placeholder='사연의 내용을 자유롭게 적어주세요.'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        <span className='Radio-comment'>
                            타인을 비방하거나 욕설·혐오 표현이 포함된 사연은 <br />
                            채택되지 않습니다. 또한, 한 번 제출된 사연은 수정이나 <br />
                            삭제가 불가능하니 신중히 작성해 주세요.
                        </span>

                        <button className='Radio-Submit' onClick={handleSubmit}>
                            사연 보내기
                        </button>
                    </div>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="Radio-Modal"
                    overlayClassName="Radio-Overlay"
                    contentLabel="사연제출완료 모달"
                >
                    <div className='Raio-Modal-Top'>
                        <img src={close} alt="모달닫기" className='Radio-Modal-Close' onClick={closeModal}/>
                    </div>
                    <img src={submit} alt="제출완료" className="Modal-submit-img" />
                    <div className="Modal-submit-text">
                        제보가 완료되었습니다. <br />
                        감사합니다.
                    </div>
                </Modal>
            </div>

            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    )
}
