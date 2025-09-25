import Header from '../../components/header';
import '../../assets/styles/common.css';
import "../CssFolder/LineUp.css";
import Footer from '/src/components/footer.jsx';
import close2 from "/icons/close2.png";
import sparkle3 from "/images/sparkle3.png";
import sparkle4 from "/images/sparkle4.png";
import sparkle6 from "/images/sparkle6.png";
import sparkle5 from "/images/sparkle5.png";
import char1 from "/images/charactor1.png";
import char2 from "/images/charactor2.png";


import lineup1 from "/images/lineup1.png";
import lineup2 from "/images/lineup2.png";
import lineup3 from "/images/lineup3.png";
import lineup4 from "/images/lineup4.png";
import lineup5 from "/images/lineup5.png";
import lineup6 from "/images/lineup6.png";

export default function LineUp() {
    const lineups = [
        { img: lineup1, name: "청하" },
        { img: lineup2, name: "에이핑크" },
        { img: lineup3, name: "빅나티" },
        { img: lineup4, name: "우디고차일드" },  
        { img: lineup5, name: "DJ Poy & Loki" },
        { img: lineup6, name: "MC 섭이" },
    ];

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
            <div id="LineUp" className="Always">
                <Header />
                <div className="LineUp">
                    <div className="LineUp-Box">
                        <img src={sparkle3} alt="sparkle3" className="LUsparkle3" />
                        <div className="LineUp-Top">
                            <span>LINE UP</span>
                            <img src={close2} alt="closeImg" />
                        </div>
                        <hr style={{ border: "none", height: "4px", backgroundColor: "#243F73", margin: 0 }} />

                        <img src={sparkle4} alt="sparkle4" className='LUsparkle4' />    

                        <ul className="lu-list">
                            {lineups.map((it, i) => (
                                <li key={i} className="lu-item">
                                    <img src={it.img} alt={it.name} className="lineupImg" />
                                    <span className="lu-name">{it.name}</span>
                                </li>
                            ))}
                        </ul>
                        <img src={sparkle6} alt="sparkle6" className='LUsparkle6' />
                        <img src={sparkle5} alt="sparkle5" className='LUsparkle5' />
                        <div className='LUCharactor-Box'>
                            <img src={char2} alt="charactor2" className='LUchar2' />
                            <img src={char1} alt="charactor1" className='LUchar1'/>
                        </div>
                    </div>
                <Footer />
                </div>
            </div>
            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    );
}
