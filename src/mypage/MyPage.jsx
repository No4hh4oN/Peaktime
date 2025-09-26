/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from '../components/header';
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
import saved from '/icons/saved.png';
import delbookmark from '/icons/delbookmark.png';
import BoothLogo from '/images/BoothLogo.png';
import AxiosClient from "../AxiosClinet";
import Marquee from "react-fast-marquee";
Modal.setAppElement("#root");

export default function MyPage() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(() => {
        return location.state?.tab || "booth";
    });

    const [refreshKey, setRefreshKey] = useState(0);
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [myStamps, setMyStamps] = useState([]);
    const [allBooths, setAllBooths] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [savedBoothIds, setSavedBoothIds] = useState([]);
    const [savedBoothDetails, setSavedBoothDetails] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 북마크 부스 목록
    const fetchSavedBooths = async () => {
        try {
            const response = await AxiosClient.get("/booth-bookmarks/my", { auth: true });
            setSavedBoothIds(response || []);

            const detailResponses = await Promise.all(
                (response || []).map((item) =>
                    AxiosClient.get(`/booths/${item.boothId}`, { auth: true })
                )
            );

            const detailsWithExtra = await Promise.all(
                detailResponses.map(async (booth) => {
                    let imageUrl = null;
                    let bookmarkCount = 0;

                    if (booth.imageId) {
                        try {
                            const imgRes = await AxiosClient.get(`/images/${booth.imageId}`, { auth: true });
                            imageUrl = imgRes.url;
                        } catch (e) {
                            console.error("이미지 불러오기 실패:", e);
                        }
                    }

                    try {
                        const countRes = await AxiosClient.get(`/booth-bookmarks/count/${booth.id}`, { auth: true });
                        bookmarkCount = countRes ?? 0;
                    } catch (e) {
                        console.error("북마크 수 불러오기 실패:", e);
                    }
                    return { ...booth, logoUrl: imageUrl, bookmarkCount };
                })
            );

            setSavedBoothDetails(detailsWithExtra);
        } catch (err) {
            console.error("북마크 부스 불러오기 실패:", err);
        }
    };

    // 북마크 삭제
    const handleDeleteBookmark = async (boothId) => {
        try {
            await AxiosClient.delete(`/booth-bookmarks/${boothId}`, { auth: true });
            setSavedBoothDetails((prev) => prev.filter((booth) => booth.id !== boothId));
        } catch (err) {
            console.error("북마크 삭제 실패:", err);
        }
    };

    // 버튼 클릭
    const handleTabClick = (tab) => {
        if (tab === activeTab) {
            setRefreshKey((prev) => prev + 1);
        } else {
            setActiveTab(tab);
            localStorage.setItem("activeTab", tab);
        }
    };

    // 부스 목록
    const fetchBooths = async () => {
        try {
            const data = await AxiosClient.get("/booths");
            const stampedBooths = data.filter((booth) => booth.stamp === true);
            setAllBooths(stampedBooths);
        } catch (err) {
            console.error("API 요청 실패:", err);
        }
    };

    // 내 스탬프
    const fetchMyStamps = async () => {
        try {
            const data = await AxiosClient.get("/booth-stamps/my", { auth: true });
            setMyStamps(data);
        } catch (err) {
            console.error("스탬프 조회 실패:", err);
        }
    };

    // 내 정보
    const fetchUserInfo = async () => {
        try {
            const data = await AxiosClient.get("/users/me", { auth: true });
            setUserName(data.name);
            setDepartment(data.department);
        } catch (err) {
            console.error("사용자 정보 조회 실패:", err);
        }
    };

    // 초기 로딩 (내정보 + 북마크)
    useEffect(() => {
        const fetchAll = async () => {
            try {
                await Promise.all([
                    fetchUserInfo(),
                    fetchSavedBooths()
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    // 탭 변경 시
    useEffect(() => {
        if (activeTab === "booth") {
            fetchBooths();
        } else if (activeTab === "stamp") {
            fetchBooths();
            fetchMyStamps();
        }
    }, [activeTab, refreshKey]);

    const hasStamp = (id) => {
        return myStamps.some(stamp => stamp.boothId === id);
    };

    const charOffset = Math.min(myStamps.length, 5) * 53;

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
            <div id="MyPage" className="MyPageAlways">
                <Header />
                <div className="MyPage">
                    {loading ? (
                        <div className="MyPage-Loading">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
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
                                        {savedBoothDetails.length === 0 ? (
                                            <p className="Empty-Booth">
                                                캠퍼스맵에서 부스를 저장해 <br />
                                                한눈에 편하게 확인해보세요!
                                            </p>
                                        ) : (
                                        <div className="Saved-Booth">
                                            {savedBoothDetails.map((booth) => (
                                                <div className="Saved-Booth-List" key={booth.id}>
                                                    <img 
                                                        src={booth.logoUrl || BoothLogo} 
                                                        alt="부스로고" 
                                                        className="saved-booth-logo"
                                                    />
                                                    <div className="Saved-Booth-Info">
                                                        <span>{booth.name}</span>
                                                        <p>{booth.description}</p>
                                                        <span>
                                                            {[booth.keyword1, booth.keyword2, booth.keyword3]
                                                                .filter((kw) => kw && kw.trim() !== "")
                                                                .map((kw, idx) => (
                                                                <div key={idx} className="Booth-KeyWords">
                                                                    {kw}
                                                                </div>
                                                            ))}
                                                        </span>
                                                    </div>
                                                        {/* <div className="Saved-Booth-Keywords">
                                                            {[booth.keyword1, booth.keyword2, booth.keyword3]
                                                                .filter((kw) => kw && kw.trim() !== "")
                                                                .map((kw, idx) => {
                                                                    const isLong = kw.length > 3;
                                                                    return (
                                                                        <span key={idx}>
                                                                            {isLong ? (
                                                                                <Marquee pauseOnHover={true} gradient={false} speed={10}>
                                                                                    {kw}
                                                                                </Marquee>
                                                                            ) : (
                                                                                kw
                                                                            )}
                                                                        </span>
                                                                    );
                                                                })}
                                                        </div> */}
                                                    <div className="Saved-Booth-Icon">
                                                        <img
                                                            src={booth.isDeleted ? delbookmark : saved}
                                                            alt="저장"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleDeleteBookmark(booth.id)}
                                                        />
                                                        <span>{booth.bookmarkCount > 99 ? "99+" : booth.bookmarkCount}</span>
                                                    </div>
                                                </div>
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
                                            {allBooths.map((booth, idx) => (
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
                        </>
                    )}
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
