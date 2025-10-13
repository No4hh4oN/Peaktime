import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notice";
import '../assets/styles/common.css';
import './Notice.css';
import festaLogo from "/images/festaLogo.png";
import Header from "../components/header";
import noticeIcon from "/icons/noticeIcon.png";

export default function Notice() {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [urgentIndex, setUrgentIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getNotices();
                const sorted = [...res].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setNotices(sorted);
            } catch (err) {
                console.error("공지 조회 실패:", err);
            }
        }
        fetchData();
    }, []);

    // 긴급 공지만 추출
    const urgentNotices = notices.filter((n) => n.category === "URGENT");

    // 일정 시간마다 인덱스 변경
    useEffect(() => {
        if (urgentNotices.length === 0) return;
        const interval = setInterval(() => {
            setUrgentIndex((prev) => (prev + 1) % urgentNotices.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [urgentNotices]);

    const categoryMap = {
        URGENT: "긴급",
        GENERAL: "공지",
        LOST_ITEM: "분실물",
    };

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">
                <img src={festaLogo} alt="festaLogo" />
            </div>
            <div className="MyPageAlways">
                <Header />
                <div className="Notice">
                    <span className="Notice-title">공지사항</span>
                    <span className="Notice-Subtitle">안전한 천보축전을 위해 꼭 공지를 확인해주세요!</span>

                    {/* 긴급공지 */}
                    <div className="notice-Urgent">
                        {urgentNotices.length > 0 && (
                            <div
                                key={urgentNotices[urgentIndex].id}
                                className="notice-card urgent slide-down"
                                onClick={() => navigate(`/Notice/${urgentNotices[urgentIndex].id}`)}
                            >
                                <img src={noticeIcon} alt="urgent" />
                                <span>{urgentNotices[urgentIndex].title}</span>
                            </div>
                        )}
                    </div>

                    {/* 공지 */}
                    <div className="notice-General">
                        {notices
                            .map((notice) => {
                                const createdTime = new Date(notice.createdAt);
                                const now = new Date();
                                const diffMinutes = (now - createdTime) / (1000 * 60);
                                const isNew = diffMinutes <= 60;

                                return (
                                    <div
                                        key={notice.id}
                                        className="notice-card general"
                                        onClick={() => navigate(`/Notice/${notice.id}`)}
                                    >
                                        <div className="notice-top">
                                            <span className="notice-title">{notice.title}</span>
                                            {isNew && <span className="notice-new">NEW</span>}
                                        </div>
                                        <div className="notice-btm">
                                            <span className="notice-category">
                                                {categoryMap[notice.category] || notice.category}
                                            </span>
                                            <span className="notice-date">
                                                {createdTime.toLocaleDateString()} {createdTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="ResponsiveScreen2">
                <div className='ResponsiveScreen2-div'>
                    <span>
                        20<br />
                        25
                    </span>
                    <span>
                        SAHMYOOK<br />
                        UNIVERSITY<br />
                        FESTIVAL
                    </span>
                </div>
            </div>
        </div >
    )
}