/* eslint-disable no-unused-vars */
import Header from '../components/header';
import { useState, useEffect } from "react";
import '../assets/styles/common.css';
import "../mypage/MyPage.css";
import Modal from "react-modal";
import profileimg from '/images/profileEX.png';
import goTreasure from '/images/GoTreasure.png';
import goChar from '/images/charactor2.png';
import emptyStamp from '/images/emptyStamp.png';
import fillStamp from '/images/fillStamp.png';
import treasureModal from '/images/treasureModal.png';
import close from '/icons/close.png';


import AxiosClient from "../AxiosClinet";

Modal.setAppElement("#root");

export default function MyPage() {

    const [activeTab, setActiveTab] = useState("booth");

    const [refreshKey, setRefreshKey] = useState(0); // 같은 탭 눌렀을 때도 렌더링
    const [savedBooths, setSavedBooths] = useState([]); 
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [myStamps, setMyStamps] = useState([]); // 스탬프 저장

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const UserNickname = localStorage.getItem("nickname");

    // 버튼 클릭 처리
    const handleTabClick = (tab) => {
        if (tab === activeTab) {
            setRefreshKey((prev) => prev + 1); // 같은 탭 눌러도 refreshKey 변경
        } else {
            setActiveTab(tab);
            localStorage.setItem("activeTab", tab); // 마지막 탭 저장
        }
    };

    // 부스 목록 불러오기
    const fetchBooths = async () => {
        try {
            const data = await AxiosClient.get("/booths");
            // console.log("서버 응답 데이터:", data);
            setSavedBooths(data);
        } catch (err) {
            // console.error("API 요청 실패:", err);
        }
    };

    // 내 스탬프 불러오기
    const fetchMyStamps = async () => {
        try {
            const data = await AxiosClient.get("/booth-stamps/my", { auth: true });
            // console.log("내 스탬프 데이터:", data);
            setMyStamps(data);
        } catch (err) {
            // console.error("스탬프 조회 실패:", err);
        }
    };

    // activeTab 또는 refreshKey가 바뀔 때마다 다시 불러오기
    useEffect(() => {
        if (activeTab === "booth") {
            fetchBooths();
        } else if (activeTab === "stamp") {
            fetchMyStamps();
        }
    }, [activeTab, refreshKey]);


    // 사용자 정보 불러오기
    const fetchUserInfo = async () => {
        try {
            const data = await AxiosClient.get("/users/me", { auth: true });
            console.log("로그인 사용자 정보:", data);
                setUserName(data.name);       
                setDepartment(data.department); 
        } catch (err) {
            console.error("사용자 정보 조회 실패:", err);
        }
    };
    useEffect(() => {
        fetchUserInfo();
    }, []);

    
    const hasStamp = (id) => {
        return myStamps.some(stamp => stamp.boothId === id);
    };

    // 캐릭터 이동 거리 (스탬프 1개당 67px, 최대 5개까지만 이동)
    const charOffset = Math.min(myStamps.length, 5) * 53;

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
            <div id="MyPage" className="Always">
                <Header />
                <div className="MyPage">
                    <div className='MyPage-Always-Top'>
                        <div className='MyPage-Profile-Box'>
                            <img src={profileimg} alt="profileImg" />
                            <span>{userName}</span>
                            <span>{department}</span>
                        </div>
                        <div className='MyPage-Two-Button'>
                            <button 
                                className={activeTab === "booth" ? "active" : ""} 
                                onClick={() => handleTabClick("booth")}
                            >
                                저장한 부스
                            </button>
                            <button 
                                className={activeTab === "stamp" ? "active" : ""} 
                                onClick={() => handleTabClick("stamp")}
                            >
                                도장판
                            </button>
                        </div>
                        <hr style={{ border: "none", width:"90%", height: "2px", backgroundColor: "#E9EBED", margin: 0 }} />
                    </div>
                    
                    <div className='MyPage-Main-Box'>
                        {activeTab === "booth" && (
                            <>
                                {savedBooths.length === 0 ? (
                                    <p className="Empty-Booth">
                                        캠퍼스맵에서 부스를 저장해 <br />
                                        한눈에 편하게 확인해보세요!
                                    </p>
                                ) : (
                                    <div className="Saved-Booth">
                                        {savedBooths.map((booth, idx) => (
                                            <div key={idx}>{booth.name}</div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "stamp" && (
                            <div className="Stamp-Board">
                                <div className='Stamp-Board-Title'>
                                    부스를 돌며 <span>시계</span>를 모아 <br />
                                    수야가 <span>보물상자</span>에 도달할 수 있도록 도와주세요!
                                </div>

                                <div className='Go-Treasure-img'>
                                    <img src={goTreasure} alt="Treasure-road" className='Treasure-Road' />
                                    <img 
                                        src={goChar} 
                                        alt="charactor" 
                                        className='Treasure-Char' 
                                        style={{ transform: `translateX(${charOffset}px)` }}
                                    />
                                    {myStamps.length >= 5 && (
                                        <button 
                                            className="Open-Treasure-Btn"
                                            onClick={openModal}
                                        >
                                            상자열어보기
                                        </button>
                                    )}
                                </div>

                                <div className="Stamp-Board-Grid">
                                    {savedBooths.map((booth, idx) => (
                                        <div className="Stamp-Board-Box" key={idx}>
                                            <img
                                                src={hasStamp(booth.id) ? fillStamp : emptyStamp}
                                                alt="stamp"
                                                className="stamp-img"
                                            />
                                            <span>{booth.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div> 
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="Treasure-Modal"
                    overlayClassName="Treasure-Overlay"
                    contentLabel="보물상자 모달"
                >
                    <div className='Treasure-Modal-Top'>
                        <span>찾았다!</span>
                        <img src={close} alt="모달닫기" className='T-Modal-Close' onClick={closeModal}/>
                    </div>

                    <img src={treasureModal} alt="treasureClock" className='T-Clock-img' />
                    <div className='Treasure-Modal-contents'>
                        <span>수야가 찾은 보물은... 바로~!</span>
                        <p>가장 빛날 당신의 피크 타임!</p>
                        <p>
                            본 화면을 <span>11번 부스의 총학생회 임원에게</span> <br />
                            인증한 후 강품 응모권을 수령해주세요.
                        </p>
                    </div>
                </Modal>
            </div>
            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    );
}
