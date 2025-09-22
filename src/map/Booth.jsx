import Header from '../components/header';
import '../assets/styles/common.css';
import './Booth.css';

export default function Booth() {
    const markers = [
        { id: 'A01', type: 'normal', left: 8.2, top: 50.3, label: '솔1' },
        { id: 'A02', type: 'normal', left: 8.2, top: 53.3, label: '솔2' },
        { id: 'A03', type: 'normal', left: 8.2, top: 56.3, label: '솔3' },
        { id: 'A04', type: 'normal', left: 8.2, top: 59.3, label: '솔4' },       
    ];

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>

            <div id="boothAlways" className="Always">
                <Header />

                <div className="Booth-Container">
                    
                </div>
            </div>

            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    );
}
