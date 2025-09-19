import AxiosClient from "../AxiosClinet";

// 부스 전체 조회
export async function getAllBooths() {
  return AxiosClient.get("/booths");
}

// 부스 상세 조회
export async function getBoothById(id) {
  return AxiosClient.get(`/booths/${id}`);
}

// 이미지 조회
export async function getImageById(imageId) {
  return AxiosClient.get(`/images/${imageId}`);
}

// 전체 북마크 수
export async function getAllBookmarkCount() {
  return AxiosClient.get("/booth-bookmarks/count");
}

// 특정 부스 북마크 수
export async function getBookmarkCountByBooth(boothId) {
  return AxiosClient.get(`/booth-bookmarks/count/${boothId}`, {
    params: { boothId },
  });
}

// 사용자 북마크 여부 확인
export async function getIsBookmark(boothId) {
  return AxiosClient.get(`/booth-bookmarks/my/${encodeURIComponent(boothId)}`, {
    auth: true
  });
}

// 북마크 하기
export async function doBookmark(boothId) {
  return AxiosClient.post(`/booth-bookmarks`,
    { boothId },
    { auth: true },
  );
}

// 북마크 취소
export async function cancelBookmark(boothId) {
  return AxiosClient.delete(`/booth-bookmarks/${encodeURIComponent(boothId)}`, {
    auth: true,
  });
}