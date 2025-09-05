import { useState } from 'react';
import '../assets/style/header.css';
import sidetab from '/icons/sidetab.png';
import closeSideTab from '/icons/closeSideTab.png';
import spark from '/icons/spark-solid.png';

export default function Header() {
    // 메뉴 오픈 상태 관리
    const [isOpen, setIsOpen] = useState(false);

    // 클릭 시 토글 함수
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="Header">
            <div className={`HeaderBox ${isOpen ? 'menu-open' : ''}`}>
                <img
                    src={sidetab}
                    alt="sidetab"
                    className="SideTabIcon"
                    onClick={toggleMenu}
                />
                <div className=''></div>
            </div>
            
            {isOpen && <div className="overlay" onClick={toggleMenu} />}
            <div className={`MenuBox ${isOpen ? 'active' : ''}`}>
                <div className=''>
                    <img src={spark} alt="spark" />
                    <img src={closeSideTab} alt="" onClick={toggleMenu}/>
                </div>
                <div>
                    <div className='MenuBox-SubMenu'>
                        <span>메인페이지</span>
                        <span>타임테이블</span>
                        <span>라인업</span>
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
                        <span>나의 정보</span>
                        <span>도장판</span>
                        <span>저장한 부스</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
