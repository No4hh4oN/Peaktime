import AxiosClient from "../AxiosClinet";

// 사연 등록
export async function postStory(data) {
    return AxiosClient.post("/stories", data, { auth: true });
}