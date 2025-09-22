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
        { start: "15:00", end: "15:15", title: "개회식" },
        { start: "15:15", end: "15:35", title: "히비스커스" },
        { start: "15:35", end: "15:55", title: "CLASSIA" },
        { start: "15:55", end: "16:15", title: "SCHEMA" },
        { start: "16:15", end: "16:25", title: "학과 치어리딩" },
        { start: "16:25", end: "17:15", title: "SU퍼스타 본선" },
        { start: "17:15", end: "17:35", title: "D.M" },
        { start: "17:35", end: "17:55", title: "PLAGUE" },
        { start: "17:55", end: "18:00", title: "PEAK;TIME" },
        { start: "18:00", end: "18:05", title: "사업 라디오" },
        { start: "18:05", end: "18:35", title: "MC 레크리에이션" },
        { start: "18:35", end: "19:00", title: "삼육대학교\n공식 응원단" },
        { start: "19:00", end: "19:30", title: "DJ POY & LOKI", accent: true },
        { start: "19:30", end: "20:00", title: "우디고자일드", accent: true },
        { start: "20:00", end: "20:30", title: "빅나티", accent: true },
        { start: "20:30", end: "21:00", title: "청하", accent: true },
        { start: "21:00", end: "21:30", title: "에이핑크", accent: true },
        { start: "21:30", end: "21:33", title: "MC마무리\n및 폐회사" },
        { start: "21:33", end: "21:35", title: "퇴장 안내" },
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
                        <hr style={{ border: "none", height: "5px", backgroundColor: "#243F73", margin: 0 }} />
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