/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import '../assets/styles/header.css';
import sidetab from '/icons/sidetab.png';
import closeSideTab from '/icons/close.png';
import headerLogo from '/images/festaLogo.png'
import { useNavigate, useLocation } from "react-router-dom";

import LogoutModal from './LogoutModal';

export default function Header() {
    const navigator = useNavigate();
    const location = useLocation();  

    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    // 페이지 이동할 때마다 로그인 여부 다시 확인
    useEffect(() => {
        const loginStatus = localStorage.getItem("isLogin");
        setIsLogin(loginStatus === "true");
    }, [location]);  

    useEffect(() => {
        const always = document.querySelector('.Always');
        if (!always) return;
        if (isOpen) {
            always.classList.add('no-scroll');
        } else {
            always.classList.remove('no-scroll');
        }
    }, [isOpen]);

    return (
        <div className="Header">
            <div className={`HeaderBox ${isOpen ? 'menu-open' : ''}`}>
                <img
                    src={sidetab}
                    alt="sidetab"
                    className="SideTabIcon"
                    onClick={toggleMenu}
                />
                <div className="HeaderCenter">
                    <img 
                        src={headerLogo} 
                        alt="festaLogo" 
                        className='HeaderLogo' 
                        onClick={() => navigator('/MainPage')}
                    />
                </div>
                <div className='Header-Login-status'>
                    {isLogin ? (
                        <span 
                            className="LoginStatus" 
                            onClick={() => setLogoutModalOpen(true)}
                        >
                            로그아웃
                        </span>
                    ) : (
                        <span 
                            className="LoginStatus" 
                            onClick={() => navigator('/')}
                        >
                            로그인
                        </span>
                    )}
                </div>
                <LogoutModal 
                    isOpen={isLogoutModalOpen} 
                    onClose={() => {
                        setLogoutModalOpen(false);
                        setIsLogin(false); // 로그아웃 시 상태 갱신
                    }} 
                />
            </div>

            {isOpen && <div className="overlay" onClick={toggleMenu} />}
            <div className={`MenuBox ${isOpen ? 'active' : ''}`}>
                <div className='MenuBox-Imgs'>
                    <img src={headerLogo} alt="festaLogo" />
                    <img src={closeSideTab} alt="" onClick={toggleMenu}/>
                </div>
                <div>
                    <div className='MenuBox-SubMenu'>
                        <span>메인페이지</span>
                        <span onClick={() => navigator('/TimeTable')}>타임테이블</span>
                        <span onClick={() => navigator('/LineUp')}>라인업</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>공지사항</span>
                        <span onClick={() => navigator('/Notice')}>공지사항</span>
                        <span onClick={() => navigator('/FAQ')}>FAQ</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>지도</span>
                        <span onClick={() => navigator('/Booth')}>부스배치도</span>
                        <span onClick={() => navigator('/Concert')}>공연 관람구역</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>무대</span>
                        <span onClick={() => navigator('/Radio')}>사연 라디오</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>마이페이지</span>
                        <span onClick={() => navigator('/MyPage')}>나의 정보 / 도장판</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
