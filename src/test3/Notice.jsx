import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notice";

export default function Notice() {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getNotices();
                setNotices(res);
            } catch (err) {
                console.error("공지 조회 실패:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {notices.map((notice) => (
                <li key={notice.id}  onClick={() => navigate(`/Notice/${notice.id}`)}>
                    <h3>{notice.title}</h3>
                    <div>
                        {notice.content}
                    </div>
                </li>
            ))}
        </div>
    )
}