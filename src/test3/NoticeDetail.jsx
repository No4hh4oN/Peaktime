import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getNoticeById, getImageById } from "../api/notice";

export default function NoticeDetail() {
    const { id } = useParams();
    const [notice, setNotice] = useState([]);

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

    return (
        <div>
            <h2>{notice.title}</h2>
            <div>
                {notice.content}
            </div>
            <p>유형: {notice.type}</p>
            <span>{notice.createdAt}</span>
            <p>작성자: {notice.author}</p>
            <p>이미지 ID: {notice.imageId}</p>
            <p>카테고리: {notice.category}</p>

            {notice.imageUrl ? (
                <img src={notice.imageUrl} alt={notice.title} width="300" />
            ) : (
                <p>이미지 없음</p>
            )}
        </div>
    )
}