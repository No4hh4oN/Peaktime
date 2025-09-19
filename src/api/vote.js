import AxiosClient from "../AxiosClinet";

// 전체 투표 목록 조회
export async function getVotes() {
    return AxiosClient.get("/votes");
}

// 투표 상세 목록(로그인한 유저만)
export async function getVoteDetailById(id) {
    return AxiosClient.get(`/votes/${id}`, { auth: true });
}