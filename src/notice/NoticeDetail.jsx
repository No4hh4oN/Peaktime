import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getNotices, getNoticeById, getImageById } from "../api/notice";
import '../assets/styles/common.css';
import './Notice.css';
import festaLogo from "/images/festaLogo.png";
import Header from "../components/header";
import noticeIcon from "/icons/noticeIcon.png";
import backArrow from "/icons/backArrow.png";

export default function NoticeDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [notice, setNotice] = useState([]);
    const [notices, setNotices] = useState([]);
    const [urgentIndex, setUrgentIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const noticeRes = await getNoticeById(id);

                let imageUrl = null;
                if (noticeRes.imageId) {
                    const imgRes = await getImageById(noticeRes.imageId);
                    imageUrl = imgRes.url ?? null;
                }

                setNotice({ ...noticeRes, imageUrl });
            } catch (err) {
                console.error("부스 상세 조회 실패:", err);
            }
        }
        fetchData();
    }, [id]);

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
        }, 5000); // 3초마다 교체
        return () => clearInterval(interval);
    }, [urgentNotices]);

    const createdTime = new Date(notice.createdAt);

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
                <div id="NoticeDetail" className="Notice">
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
                    <div className="NoticeDetail">
                        <div className="NoticeDetail-Title">
                            <img id="backArrow" src={backArrow} alt="" onClick={() => navigate(-1)}/>
                            <span><span>[{categoryMap[notice.category] || notice.category}]</span>{notice.title}</span>
                        </div>
                        <div className="NoticeDetail-Contents">
                            {notice.imageUrl ? (
                                <img className="NoticeDetail-Img" src={notice.imageUrl} alt={notice.title}/>
                            ) : (
                                <></>
                            )}
                            <div className="NoticeDetail-content">
                                {notice.content}
                            </div>

                        </div>
                        <span className="NoticeDetail-Date">{createdTime.toLocaleDateString()} {createdTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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