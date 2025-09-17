import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import JoinModal from '../components/JoinModal';
import '../assets/styles/common.css';
import './Home.css';
import festaTitle from "/images/festaTitle.png";
import festaLogo from "/images/festaLogo.png";
import cross from "/icons/Cross.png";

export default function Home() {
    const navigator = useNavigate();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isJoinOpen, setJoinOpen] = useState(false);

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">
                PeakTime
            </div>
            <div id='home' className="Always">
                <div className='HomeContents'>
                    <span className='Home_SYU'>
                        SAHMYOOK<br />
                        UNIVERSITY<br />
                        FESTIVAL
                    </span>
                    <img src={festaTitle} alt="2025천보축전" />
                    <div className='Home_Title'>삼육대학교 2025 천보축전 페이지</div>
                    <div className='Home_Co'>
                        <span id='synergy'>
                            삼육대학교 제65대<br />
                            학생회 시너지
                        </span>
                        <img src={cross} alt="" />
                        <span id='likelion13th'>
                            멋쟁이사자처럼<br />
                            삼육대학교 13기
                        </span>
                    </div>
                    <div className='authButtons'>
                        <button id='login' className='authButton' onClick={() => setLoginOpen(true)}>로그인</button>
                        <button id='join' className='authButton' onClick={() => setJoinOpen(true)}>계정 만들기</button>
                        <button id='noAuth' onClick={() => navigator('/Main')}>비회원 입장하기</button>
                    </div>
                    <img id='festaLogo' src={festaLogo} alt="PeakTime" />
                </div>
            </div>
            <div className="ResponsiveScreen2">
                LikeLion
            </div>
            <LoginModal isOpen={isLoginOpen} onRequestClose={() => setLoginOpen(false)} />
            <JoinModal isOpen={isJoinOpen} onRequestClose={() => setJoinOpen(false)} />
        </div>
    )
}