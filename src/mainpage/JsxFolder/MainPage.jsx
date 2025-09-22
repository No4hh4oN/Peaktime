import Header from '../../components/header';
import '../../assets/styles/common.css';
import "../CssFolder/MainPage.css"
import PurposeHistory from "./PurposeHistory"
import About from "./About"
import Footer from '/src/components/footer.jsx'
import Sponsor from "./Sponsor"
import MainFooter from "./MainFooter"
import MainImg from "/images/MainImg.png";
import festaTitle from "/images/festaTitle.png";
import cross from "/icons/Cross.png";

export default function Main() {
    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">
                PeakTime
            </div>
            <div id='mainAlways' className="Always">
                <Header />
                <div className='MainPage'>
                    <div className='MainPage-Top'>
                        <span className='MainPage_year'>
                            20<br />
                            25
                        </span>
                        <span className='MainPage_SYU'>
                            SAHMYOOK<br />
                            UNIVERSITY<br />
                            FESTIVAL
                        </span>
                    </div>
                    <img src={MainImg} alt="mainImg" className='MainImg' />

                    <div className='MainPageContents'>
                        <img src={festaTitle} alt="2025천보축전" className='MainPageTitleImg' />
                        <div className='MainPage_Title'>삼육대학교 2025 천보축전 페이지</div>
                        <div className='MainPage_Co'>
                            <span id='MainSynergy'>
                                삼육대학교 제65대<br />
                                학생회 시너지
                            </span>
                            <img src={cross} alt="" />
                            <span id='MainLikelion13th'>
                                멋쟁이사자처럼<br />
                                삼육대학교 13기
                            </span>
                        </div>
                    </div>
                </div>
                <div className='SubMain'>
                    <PurposeHistory/>
                    <About/>
                    <Sponsor/>
                    <Footer/>
                </div>
                <MainFooter/>
            </div>
            <div className="ResponsiveScreen2">
                LikeLion
            </div>
        </div>
    )
}