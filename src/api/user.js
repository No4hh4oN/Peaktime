import AxiosClient from "../AxiosClinet";

// 아이디 중복 확인
export async function checkId(userId) {
    return AxiosClient.get("/users/check-id", {
        params: { userId }
    });
}

// 이메일 중복 확인
export async function checkEmail(email) {
    return AxiosClient.get("/users/check-email", {
        params: { email }
    });
}

// 학번 중복 확인
export async function checkStudentId(studentId) {
    return AxiosClient.get("/users/check-student-id", {
        params: { studentId }
    });
}

// 회원가입
export async function joinUser({ userId, email, password, name, studentId, department }) {
    return AxiosClient.post("/users", {
        userId,
        email,
        password,
        name,
        studentId,
        department
    });
}

// 사용자 정보 불러오기
export async function userMe() {
    return AxiosClient.get("/users/me", { auth: true });
}


// 임시 비밀번호 발급
export async function resetPassword({ userId, email, studentId }) {
    return AxiosClient.post("/users/reset-password", {
        userId,
        email,
        studentId,
    });
}