import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoothById, getImageById, getBookmarkCountByBooth } from "../api/booth";

export default function BoothDetail() {
    const { id } = useParams();
    const [booth, setBooth] = useState(null);

    // 상세정보 조회, imageId -> 이미지 url, 북마크 수 조회
    useEffect(() => {
        async function fetchData() {
            try {
                const boothRes = await getBoothById(id);

                // 이미지
                let imageUrl = null;
                if (boothRes.imageId) {
                    try {
                        const imgRes = await getImageById(boothRes.imageId);
                        imageUrl = imgRes.url ?? null;
                    } catch {
                        imageUrl = null;
                    }
                }

                // 북마크 수
                let bookmarkCount = 0;
                try {
                    const countRes = await getBookmarkCountByBooth(id);
                    bookmarkCount = countRes.count ?? countRes ?? 0;
                } catch {
                    bookmarkCount = 0;
                }

                setBooth({ ...boothRes, imageUrl, bookmarkCount });
            } catch (err) {
                console.error("부스 상세 조회 실패:", err);
            }
        }
        fetchData();
    }, [id]);

    if (!booth) return <p>불러오는 중...</p>;

    return (
        <div>
            <h2>{booth.name}</h2>
            <p>{booth.description}</p>
            <p>유형: {booth.type}</p>
            <p>
                키워드: {booth.keyword1}, {booth.keyword2}, {booth.keyword3}
            </p>
            <p>이미지 ID: {booth.imageId}</p>

            {booth.imageUrl ? (
                <img src={booth.imageUrl} alt={booth.name} width="300" />
            ) : (
                <p>이미지 없음</p>
            )}

            <p>북마크 수: {booth.bookmarkCount}</p>
        </div>
    );
}
