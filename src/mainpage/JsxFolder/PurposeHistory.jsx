import '../../assets/styles/common.css';
import '../CssFolder/PurposeHistory.css'
import star from "/images/star.png";
import char1 from "/images/charactor1.png";
import char2 from "/images/charactor2.png";
import goAbout from "/images/goAbout.png";


export default function PurposeHistory(){
    return (
        <div className="PurHis">
            <div className='Purpose'>
                <div className='Purpose-Top'>
                    <img src={char1} alt="charactor1" />
                    <span>Purpose</span>
                </div>
                <div className='Purpose-Contents'>
                    천보축전 <span>‘PEAK;TIME’</span>은 각자가 쌓아 온 시간의<br />
                    정점(PEAK)을 서로의 응원과 참여로 함께 완성하는<br />
                    시간을 의미합니다.
                    <br />
                    <br />
                    바쁜 일상 속에서도 학생 여러분이 자신의 가능성과 성<br />
                    취를 무대 위에서 증명하고, 공동체의 연대 속에서<br />
                    그 순간이 더 크게 빛나도록 하는 축제를 지향합니다. 
                    <br /><br />
                    <span>‘정점(PEAK)’</span>은 학업·동아리·창작·체육 등 다양한 영역<br />
                    에서 도전과 성장을 장려하고, 무대와 프로그램을 통해<br />
                    성과를 드러낼 기회를 넓힌다는 뜻입니다.<br />
                    이를 통해 개인의 피크가 학교의 피크로 이어지도록 연<br />
                    결합니다.
                    <br /><br />
                    <span>‘타임(TIME)’</span>은 함께 만든 시간의 가치를 강조합니다.<br />
                    서로의 차이를 존중하고 안전과 배려를 우선하며,<br />
                    누구나 참여할 수 있는 개방적·포용적 축제 문화를<br />
                    확립합니다.
                    <br /><br />
                    개인의 전성기가 모여 공동의 정점이 되는 순간을<br />
                    만들겠습니다. 오늘의 축제는 <span>‘함께 만드는 변화’</span> 속에서<br />
                    청춘의 전성기, <span>낭만합격을 실현</span>합니다. 
                </div>
            </div>

            <img src={star} alt="starImg" className='StarImg'/>

            <div className='History'>
                <div className='History-Top'>
                    <img src={char2} alt="charactor2" />
                    <span>History</span>
                </div>
                <div className='History-Contents'>
                    삼육대학교는 1906년 개교 이후<br />
                    1961년 학생 자치기구를 조직하며 대학문화 창달의<br />
                    기초를 다져왔습니다. 
                    <br /><br />
                    그 노력은 2007년 첫 천보축전으로 이어져,<br />
                    구성원이 소통하고 재능을 펼치는 장으로<br />
                    자리매김해 왔습니다. 올해 제65대 총학생회 ‘시너지’는 <br />
                    그 성과를 계승해 PEAK;TIME(피크타임)을 주제로, <br />
                    바쁜 일상 속 각자가 도달한 최고의 순간을 서로의 <br />
                    응원으로 완성하는 축제를 만들고자 합니다. 
                    <br /><br />
                    2025년 개교 119주년 기념 천보축전은 <br />
                    ‘함께 만드는 변화’ 속에서 청춘의 전성기, 낭만합격을 <br />
                    실현할 것입니다. 
                </div>
            </div>  
            <img src={goAbout} alt="goAbout" className='StarImg'/>
        </div>
    )
}