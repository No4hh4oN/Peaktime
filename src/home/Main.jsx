import Header from '../components/header';
import Logo1 from '/images/PeakTimeLogo1.png';
import './Main.css';

export default function Main() {
    return (
        <div className="MainScreen">
            <div className="ResponsiveScreen1">
                PeakTime
            </div>
            <div className="Always">
                <Header />
                <img className='MainScreen-Logo' src={Logo1} alt="PeakTime" />

            </div>
            <div className="ResponsiveScreen2">
                LikeLion
            </div>
        </div>
    )
}