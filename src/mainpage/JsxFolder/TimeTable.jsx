import Header from '../../components/header';
import '../../assets/styles/common.css';
import "../CssFolder/TimeTable.css"
import close2 from "/icons/close2.png";
import festaTitle from "/images/festaTitle.png";
import sparkle3 from "/images/sparkle3.png";
import sparkle4 from "/images/sparkle4.png";
import sparkle5 from "/images/sparkle5.png";
import char1 from "/images/charactor1.png";
import char2 from "/images/charactor2.png";
import Footer from '/src/components/footer.jsx'



export default function TimeTable(){


    const List = [
        { start: "15:00", end: "15:20", title: "개회식" },
        { start: "15:20", end: "15:50", title: "클래시아" },
        { start: "15:50", end: "16:20", title: "스키마" },
        { start: "16:20", end: "16:50", title: "히비" },
        { start: "16:50", end: "17:05", title: "PLAY YOUR\nPEAK;TIME" },
        { start: "17:05", end: "17:15", title: "환경디자인원예학과\n치어리딩" },
        { start: "17:15", end: "17:45", title: "SU퍼스타" },
        { start: "17:45", end: "18:05", title: "D.M" },
        { start: "18:05", end: "18:35", title: "PLAGUE" },
        { start: "18:35", end: "19:00", title: "공식응원단\n유피오리아" },
        { start: "19:00", end: "21:30", title: "천보축전 콘서트", accent: true },
        { start: "21:30", end: "21:35", title: "퇴장 안내" },
    ];

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">
                PeakTime
            </div>
            <div id='TimeTable' className="Always">
                <Header />
                <div className='TimeTable'>
                    <div className='TimeTable-Box'>
                        <img src={festaTitle} alt="festaTitle" className='TimefestaTitle' />
                        <img src={sparkle3} alt="sparkle3" className='sparkle3' />
                        <div className='TimeTable-Top'>
                            <span>TIME TABLE</span>
                            <img src={close2} alt="closeImg" />
                        </div>
                        <hr style={{ border: "none", height: "4px", backgroundColor: "#243F73", margin: 0 }} />
                        <div className='TimeTable-List'>
                            <ul className="tt-list">
                                {List.map((s, i) => (
                                <li key={`${s.start}-${i}`} className="tt-row">
                                    <span className="tt-time">
                                        {s.start} - {s.end}
                                    </span>
                                    <span className={`tt-title ${s.accent ? "accent" : ""}`}>
                                        {s.title}
                                    </span>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <img src={sparkle4} alt="sparkle4" className='sparkle4' />
                        <img src={sparkle5} alt="sparkle5" className='sparkle5' />
                        <div className='TimeCharactor-Box'>
                            <img src={char2} alt="charactor2" className='char2' />
                            <img src={char1} alt="charactor1" className='char1'/>
                        </div>

                    </div>
                    <Footer/>
                </div>
            </div>
            <div className="ResponsiveScreen2">
                LikeLion
            </div>
        </div>
    )
}