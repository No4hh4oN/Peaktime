import AxiosClient from "../AxiosClinet";

// 공지 조회
export async function getNotices() {
    return AxiosClient.get("/notices");
}

// 공지 상세 조회
export async function getNoticeById(id) {
    return AxiosClient.get(`/notices/${id}`);
}

// 이미지 조회
export async function getImageById(imageId) {
  return AxiosClient.get(`/images/${imageId}`);
}