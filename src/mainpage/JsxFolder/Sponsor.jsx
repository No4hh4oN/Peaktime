import '../../assets/styles/common.css';
import '../CssFolder/Sponsor.css';

import folder1 from "/images/Folder1.png"; 
import folder2 from "/images/Folder2.png"; 
import folder3 from "/images/folder3.png";
import folder4 from "/images/folder4.png";
import folder5 from "/images/folder5.png";
import folder6 from "/images/folder6.png";
import folder7 from "/images/folder7.png";
import folder8 from "/images/folder8.png";


export default function Sponsor() {
    const sponsors = [
        { img: folder1, name: "한미자동차운전학원" },
        { img: folder2, name: "빙그레" },
        { img: folder3, name: "굿네이버스" },
        { img: folder4, name: "삼육식품" },
        { img: folder5, name: "차이홍" },
        { img: folder6, name: "밝은눈안과의원" },
        { img: folder7, name: "신룽푸 마라탕" },
        { img: folder8, name: "국방부" },
    ];

    return (
        <div className="Sponsor">
            <div className="Sponsor-title">SPONSOR</div>

            <div className="Sponsor-List">
                {sponsors.map((s, i) => (
                    <div className="Sponsor-Card" key={i}>
                        <img src={s.img} alt={`sponsor-${i + 1}`} className="Sponsor-Img" />
                        <span className="Sponsor-Name">{s.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
