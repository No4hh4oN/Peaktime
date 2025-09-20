import '../../assets/styles/common.css';
import '../CssFolder/About.css'
import char1 from "/images/charactor1.png";
import char2 from "/images/charactor2.png";
import cross2 from "/icons/Cross2.png";
import close2 from "/icons/close2.png";
import sparkle1 from "/images/sparkle1.png";
import sparkle2 from "/images/sparkle2.png";

import LionSay from "/images/LikeLionSay.png";
import SYUSay from "/images/SYUSay.png";
import LionLogo from "/images/LikeLionLogo.png";
import SYULogo from "/images/SYULogo.png";
import LionClick from "/images/LionClick.png";
import SYUClick from "/images/SYUClick.png";

import heart from "/images/heart.png";


export default function About(){

    return (
        <div className="About">
            <div className='About-Box'>
                <img src={sparkle1} alt="sparkle1" className='sparkle1' />

                <div className='About-Top'>
                    <span>ABOUT</span>
                    <img src={close2} alt="closeImg" />
                </div>

                <hr style={{ border: "none", height: "5px", backgroundColor: "#243F73", margin: 0 }} />


                <div className='About-Member'>
                    <span>
                        LIKELION AT SYU <br />
                        멋쟁이사자처럼 삼육대학교 13기 
                    </span>
                    <img src={cross2} alt="crossImg" />
                    <span>
                        삼육대학교 제65대 학생회 ‘시너지’
                    </span>
                </div>

                <div className='About-Contents'>
                    안녕하세요! 삼육대학교 학우 여러분. <br />
                    학우분들께서 더욱 즐겁게 2025 천보축전을 즐기실 수 <br />
                    있도록 삼육대학교 총학생회 '시너지'와 멋쟁이사자처럼 <br />
                    삼육대학교가 협업해<br />
                    2025 천보축전 페이지를 개발하였습니다. <br />
                    <br />
                    2025 천보축전 페이지와 함께 축제를 즐기시고 <br />
                    소중한 청춘의 추억을 만드시길 바랍니다. <br />
                    감사합니다.
                </div>

                <img src={sparkle2} alt="sparkle2" className='sparkle2' />
                <div className='About-Char-Img'>
                    <img src={char2} alt="char2" />
                    <img src={char1} alt="char1" />
                </div>
            </div>

            <div className='Member-Info'>
                <div className='LikeLion-Info'>
                    <img src={LionSay} alt="" className='LikeLionInfoBox' />
                    <div className='LikeLion-absolute'>
                        <div className='LikeLion-Top'>
                            <img src={LionLogo} alt=""  className='LikeLionLogo' />
                            <div className='LikeLion-title'>멋쟁이사자처럼<br />삼육대학교 13기</div>
                        </div>

                        <div className='Lion-Info-contents'>
                            멋쟁이사자처럼 삼육대학교는 <br /> 
                            테크 기반의 아이디어 실현을 위한 <br />
                            전국 최대 규모의 대학연합 IT 동아리이자<br />
                            삼육대학교 중앙 동아리입니다.
                        </div>
                        <div className='go-lion-homepage'>
                            <button>삼육 멋사 13기 홈페이지</button>
                            <img src={LionClick} alt="clickimg" />
                        </div>
                    </div>
                </div>

                <div className='SYU-Info'>
                    <img src={SYUSay} alt="" className='SYUInfoBox'/>
                    <div className='SYU-absolute'>
                        <div className='SYU-Top'>
                            <div className='SYU-title'>제 65대 삼육대학교<br />총학생회 ‘시너지’</div>
                            <img src={SYULogo} alt="" className='SYULogo' />
                        </div>
                        <div className='SYU-Info-contents'>
                            함께 만드는 변화, 시너지! <br />
                            안녕하세요, 삼육대학교 제65대 총학생회 <br />
                            ‘시너지’입니다. <br /><br />

                            올해 천보축전의 타이틀 PEAK;TIME처럼, <br />
                            대학생활의 매 순간이 정점이 되도록 학생 <br />
                            여러분과 함께하겠습니다. 감사합니다.
                        </div>
                        
                        <div className='go-syu-homepage'>
                            <img src={SYUClick} alt="clickimg" />
                            <button>학생회 ‘시너지’ 인스타그램</button>
                        </div>
                    </div>
                </div>
            </div>

            <img src={heart} alt="heartimg" className='heartImg' />
        </div>
    )
}