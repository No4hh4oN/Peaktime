import { useState, useEffect } from 'react';
import '../assets/styles/header.css';
import sidetab from '/icons/sidetab.png';
import closeSideTab from '/icons/close.png';
import headerLogo from '/images/festaLogo.png'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigator = useNavigate();
    // 메뉴 오픈 상태 관리
    const [isOpen, setIsOpen] = useState(false);

    // 클릭 시 토글 함수
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

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
                <img src={headerLogo} alt="festaLogo" className='HeaderLogo' onClick={() => navigator('/MainPage')}/>
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
                        <span>FAQ</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>지도</span>
                        <span>부스배치도</span>
                        <span>공연 관람구역</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>무대</span>
                        <span>사연 라디오</span>
                        <span>가요제</span>
                    </div>
                    <div className='MenuBox-SubMenu'>
                        <span>마이페이지</span>
                        <span onClick={() => navigator('/MyPage')}>나의 정보</span>
                        <span onClick={() => navigator('/MyPage', { state: { tab: 'stamp' } })}>도장판</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
