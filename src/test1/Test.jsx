import { useState } from "react";
import {
    joinUser,
    checkId,
    checkEmail,
    checkStudentId,
    userMe,
    resetPassword,
} from "../api/user";
import { login } from "../api/auth";
import './Test.css';

export default function Test() {
    const [form, setForm] = useState({
        userId: "",
        email: "",
        password: "",
        name: "",
        studentId: "",
        department: ""
    });

    const [checks, setChecks] = useState({
        id: null,
        email: null,
        studentId: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    // id 체크
    const handleCheckId = async () => {
        try {
            const res = await checkId(form.userId);

            console.log(res)
            if (res.duplicated) {
                alert(res.message);
                setForm((f) => ({ ...f, userId: "" }));
            } else {
                alert("사용 가능한 아이디입니다.");
            }
        } catch (e) {
            alert("아이디 중복 확인 실패");
        }
    };

    // email 체크
    const handleCheckEmail = async () => {
        try {
            const res = await checkEmail(form.email);

            if (res.duplicated) {
                alert(res.message);
                setForm((f) => ({ ...f, email: "" }));
            } else {
                alert(res.message);
            }
        } catch (err) {
            alert("이메일 중복 확인 중 오류 발생");
        }
    };


    // 학번 체크
    const handleCheckStudentId = async () => {
        try {
            const res = await checkStudentId(form.studentId);
            alert(`${res.message}`);
        } catch (e) {
            alert("학번 중복 확인 실패");
        }
    };

    // 회원가입
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await joinUser({
                ...form,
                role: "USER",
                createdAt: new Date().toISOString(),
            });

            if (res === "회원가입 성공") {
                alert(res);
            } else {
                alert(res);
            }

        } catch (err) {
            console.log("error")
        }
    };

    const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });

    const handleChange2 = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    // 로그인
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("보내는 데이터:", loginForm);
        try {
            const res = await login(loginForm);
            // 응답: { token, role }
            localStorage.setItem("accessToken", res.token);
            localStorage.setItem("userRole", res.role);
            setLoginForm((f) => ({ identifier: "", password: "" }));
            alert("로그인 성공!");
        } catch (err) {
            alert("이이디와 비밀번호를 확인해주세요.");
        }
    };


    // 내 정보 불러오기
    const [userInfo, setUserInfo] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await userMe();
            setUserInfo(res);
        } catch (err) {
            console.error(err);
        }
    };

    // 임시 비밀번호
    const [tempPw, setTempPw] = useState(null);

    const [resetForm, setResetForm] = useState({
        userId: "",
        studentId: null,
        email: null,
    });

    const handleChange3 = (e) => {
        setResetForm({ ...resetForm, [e.target.name]: e.target.value });
    };

    const fetchTempPw = async (e) => {
        e.preventDefault();
        try {
            const res = await resetPassword(resetForm);
            console.log(res);
            setTempPw(res);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="TestPage">
            <div className="JoinBox">
                <p>회원가입</p>
                <form onSubmit={handleSubmit}>
                    <input
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="아이디"
                    />
                    <button type="button" onClick={handleCheckId}>아이디 중복 확인</button>
                    <br />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="이메일"
                    />
                    <button type="button" onClick={handleCheckEmail}>이메일 중복 확인</button>
                    <br />

                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                    <br />

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="이름"
                    />
                    <br />

                    <input
                        name="studentId"
                        value={form.studentId}
                        onChange={handleChange}
                        placeholder="학번"
                    />
                    <button type="button" onClick={handleCheckStudentId}>학번 중복 확인</button>
                    <br />

                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        placeholder="학과"
                    />

                    <br />

                    <button type="submit">회원가입</button>
                </form>
            </div>
            <div className="LoginBox">
                <p>로그인</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="identifier"
                        value={loginForm.identifier}
                        onChange={handleChange2}
                        placeholder="아이디 또는 이메일"
                    />
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleChange2}
                        placeholder="비밀번호"
                    />
                    <br />
                    <button type="submit">로그인</button>
                </form>
            </div>
            <div>
                <button onClick={fetchUser}>내 정보 조회하기</button>
                {userInfo && (
                    <div className="UserInfoBox">
                        <h3>내 정보</h3>
                        <p>아이디: {userInfo.userId}</p>
                        <p>이름: {userInfo.name}</p>
                        <p>이메일: {userInfo.email}</p>
                        <p>학번: {userInfo.studentId}</p>
                        <p>학과: {userInfo.department}</p>
                    </div>
                )}
            </div>

            <div>
                <form onSubmit={fetchTempPw}>
                    <input
                        name="userId"
                        value={resetForm.userId}
                        onChange={handleChange3}
                        placeholder="아이디"
                    />

                    <br />

                    <input
                        name="email"
                        value={resetForm.email}
                        onChange={handleChange3}
                        placeholder="이메일"
                    />

                    <br />
                    <input
                        name="studentId"
                        value={resetForm.studentId}
                        onChange={handleChange3}
                        placeholder="학번"
                    />
                    <br />
                    <button type="submit">임시 비밀번호 발급받기</button>
                </form>
                <span>{tempPw}</span>
            </div>
        </div>
    )
}