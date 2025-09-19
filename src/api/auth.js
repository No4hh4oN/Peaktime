import AxiosClient from "../AxiosClinet";

// 로그인
export async function login({ identifier, password }) {
    return AxiosClient.post("/auth/login", {
        identifier,
        password,
    });
}
