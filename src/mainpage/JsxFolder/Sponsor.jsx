import '../../assets/styles/common.css';
import '../CssFolder/Sponsor.css'
import folder1 from "/images/Folder1.png";
import folder2 from "/images/Folder2.png";


export default function Sponsor(){

    return (
        <div className="Sponsor">
            <div className='Sponsor-title'>SPONSOR</div>
            <div className='Sponsor-Img'>
                <div className='Sponsor-set'>
                    <img src={folder1} alt="sponsor1" className='sponsorImg'/>
                    <span>현대자동차운전학원</span>
                </div>
                <div className='Sponsor-set'>
                    <img src={folder2} alt="sponsor2" className='sponsorImg'/>
                    <span>빙그레</span>
                </div>
            </div>
        </div>
    )
}