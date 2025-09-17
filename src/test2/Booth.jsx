import { useEffect, useState, useCallback } from "react";
import {
  getAllBooths,
  getImageById,
  getBookmarkCountByBooth,
  getIsBookmark,
  doBookmark,
  cancelBookmark, // 취소도 함께
} from "../api/booth";
import { useNavigate } from "react-router-dom";

export default function BoothTest() {
  const navigate = useNavigate();
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) fetch 함수를 useCallback으로 분리
  const loadBooths = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllBooths();
      const boothsWithExtra = await Promise.all(
        res.map(async (booth) => {
          let imageUrl = null;
          let bookmarkCount = 0;
          let isBookmark = false;

          if (booth.imageId) {
            try {
              const imgRes = await getImageById(booth.imageId);
              imageUrl = imgRes?.url ?? null;
            } catch {}
          }

          try {
            const countRes = await getBookmarkCountByBooth(booth.id);
            bookmarkCount = countRes?.count ?? countRes ?? 0;
          } catch {}

          try {
            const isBookmarkRes = await getIsBookmark(booth.id);
            isBookmark = !!isBookmarkRes;
          } catch {}

          return { ...booth, imageUrl, bookmarkCount, isBookmark };
        })
      );
      setBooths(boothsWithExtra);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooths();
  }, [loadBooths]);

  const handleToggleBookmark = async (booth, e) => {
    e.stopPropagation();
    try {
      if (booth.isBookmark) {
        await cancelBookmark(booth.id);
      } else {
        await doBookmark(booth.id);
      }
      await loadBooths();
    } catch (err) {
      console.error("북마크 처리 실패:", err);
    }
  };

  return (
    <div>
      <p>부스 전체 목록</p>
      <ul>
        {booths.map((booth) => (
          <li key={booth.id} onClick={() => navigate(`/Booth/${booth.id}`)}>
            <h3>{booth.name}</h3>
            <p>{booth.description}</p>
            <p>유형: {booth.type}</p>
            <p>키워드: {booth.keyword1}, {booth.keyword2}, {booth.keyword3}</p>
            {booth.imageUrl ? (
              <img src={booth.imageUrl} alt={booth.name} width="200" />
            ) : (
              <p>이미지 없음</p>
            )}
            <p>북마크 수: {booth.bookmarkCount}</p>

            <button onClick={(e) => handleToggleBookmark(booth, e)}>
              {booth.isBookmark ? "북마크 취소" : "북마크 하기"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
