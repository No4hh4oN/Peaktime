import Header from '../components/header';
import '../assets/styles/common.css';


export default function Main() {
    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">
                PeakTime
            </div>
            <div className="Always">
                {/* 헤더는 필요할 때만 불러올 것 */}
                <Header />
            </div>
            <div className="ResponsiveScreen2">
                LikeLion
            </div>
        </div>
    )
}