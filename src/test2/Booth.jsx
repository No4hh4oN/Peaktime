import { useEffect, useState } from "react";
import {
  getAllBooths,
  getImageById,
  getBookmarkCountByBooth,
} from "../api/booth";
import { useNavigate } from "react-router-dom";

export default function BoothTest() {
  const navigate = useNavigate();
  const [booths, setBooths] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllBooths();

        // 각 부스의 image + 북마크 수 가져오기
        const boothsWithExtra = await Promise.all(
          res.map(async (booth) => {
            let imageUrl = null;
            let bookmarkCount = 0;

            // 이미지
            if (booth.imageId) {
              try {
                const imgRes = await getImageById(booth.imageId);
                imageUrl = imgRes.url ?? null;
              } catch {
                imageUrl = null;
              }
            }

            // 북마크 수
            try {
              const countRes = await getBookmarkCountByBooth(booth.id);
              // countRes가 숫자인지 {count: n} 형식인지 Swagger 응답에 맞게 확인 필요
              bookmarkCount = countRes.count ?? countRes ?? 0;
            } catch {
              bookmarkCount = 0;
            }

            return { ...booth, imageUrl, bookmarkCount };
          })
        );

        setBooths(boothsWithExtra);
      } catch (err) {
        console.error("부스 조회 실패:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>부스 전체 목록</p>
      <ul>
        {booths.map((booth) => (
          <li key={booth.id} onClick={() => navigate(`/Booth/${booth.id}`)}>
            <h3>{booth.name}</h3>
            <p>{booth.description}</p>
            <p>유형: {booth.type}</p>
            <p>
              키워드: {booth.keyword1}, {booth.keyword2}, {booth.keyword3}
            </p>
            <p>이미지 ID: {booth.imageId}</p>
            {booth.imageUrl ? (
              <img src={booth.imageUrl} alt={booth.name} width="200" />
            ) : (
              <p>이미지 없음</p>
            )}
            <p>북마크 수: {booth.bookmarkCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
