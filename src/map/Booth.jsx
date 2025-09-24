import Header from '../components/header';
import '../assets/styles/common.css';
import './Booth.css';

import Campusmap from '../assets/svg/Campusmap.svg?react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRef } from "react";

import boothIcon from '../assets/svg/booth.svg';
import photoIcon from '../assets/svg/photo.svg';
import foodIcon from '../assets/svg/food.svg';
import situationIcon from '../assets/svg/situation.svg';

export default function Booth() {
    const transformRef = useRef(null);

    const markers = [
        // 피크닉존 부스
        { id: 'A01', left: 28.2, top: 29, label: '피1', type: 'booth' },
        { id: 'A02', left: 30.2, top: 29, label: '피2', type: 'booth' },
        { id: 'A03', left: 32.2, top: 29, label: '피3', type: 'booth' },
        { id: 'A04', left: 34.2, top: 29, label: '피4', type: 'booth' },
        { id: 'A05', left: 36.2, top: 29, label: '피5', type: 'booth' },
        { id: 'A06', left: 38.2, top: 29, label: '피6', type: 'booth' },

        { id: 'A07', left: 39.6, top: 30.3, label: '피7', type: 'booth' },
        { id: 'A08', left: 39.6, top: 32.3, label: '피8', type: 'booth' },
        { id: 'A09', left: 39.6, top: 34.3, label: '피9', type: 'booth' },
        { id: 'A10', left: 39.6, top: 36.3, label: '피10', type: 'booth' },
        { id: 'A11', left: 39.6, top: 38.3, label: '피11', type: 'booth' },
        { id: 'A12', left: 39.6, top: 40.3, label: '피12', type: 'booth' },

        { id: 'A13', left: 32.4, top: 42.8, label: '합상1', type: 'situation' },
        { id: 'A14', left: 31.0, top: 42.8, label: '합상2', type: 'situation' },
        { id: 'A15', left: 29.6, top: 42.8, label: '합상3', type: 'situation' },
        { id: 'A16', left: 28.2, top: 42.8, label: '합상4', type: 'situation' },

        // 솔광    
        { id: 'C01', left: 6.1, top: 48.8, label: '솔1', type: 'booth' },
        { id: 'C02', left: 8.1, top: 48.8, label: '솔2', type: 'booth' },
        { id: 'C03', left: 10.1, top: 48.8, label: '솔3', type: 'booth' },
        { id: 'C04', left: 12.1, top: 48.8, label: '솔4', type: 'booth' },

        { id: 'C05', left: 13.8, top: 50.8, label: '솔5', type: 'photo' },
        { id: 'C06', left: 13.8, top: 52.8, label: '솔6', type: 'photo' },
        { id: 'C07', left: 13.8, top: 54.8, label: '솔7', type: 'photo' },
        { id: 'C08', left: 13.8, top: 56.8, label: '솔8', type: 'photo' },

        { id: 'C09', left: 6.1, top: 58.5, label: '솔9', type: 'booth' },
        { id: 'C10', left: 8.1, top: 58.5, label: '솔10', type: 'booth' },
        { id: 'C11', left: 10.1, top: 58.5, label: '솔11', type: 'booth' },
        { id: 'C12', left: 12.1, top: 58.5, label: '솔12', type: 'booth' },

        { id: 'C13', left: 3.8, top: 50.5, label: '솔13', type: 'booth' },
        { id: 'C14', left: 3.8, top: 52.5, label: '솔14', type: 'booth' },
        { id: 'C15', left: 3.8, top: 54.5, label: '솔15', type: 'booth' },
        { id: 'C16', left: 3.8, top: 56.5, label: '솔16', type: 'booth' },

        // 푸드트럭
        { id: 'D01', left: 18.1, top: 58.1, label: '바1', type: 'food' },
        { id: 'D02', left: 26.1, top: 58.1, label: '바2', type: 'food' },
        { id: 'D03', left: 28.1, top: 63.1, label: '바3', type: 'food' },
        { id: 'D04', left: 24.1, top: 63.1, label: '바4', type: 'food' },
        { id: 'D05', left: 20.1, top: 63.1, label: '바5', type: 'food' },
        { id: 'D06', left: 16.1, top: 63.1, label: '바6', type: 'food' },

        // 도서관 부스
        { id: 'B01', left: 3.8, top: 44.7, label: '도1', type: 'booth' },
        { id: 'B02', left: 5.2, top: 44.7, label: '도1', type: 'booth' },

        { id: 'B03', left: 5.2, top: 43.0, label: '도1', type: 'booth' },
        { id: 'B04', left: 5.2, top: 41.6, label: '도1', type: 'booth' },
        { id: 'B05', left: 5.2, top: 40.2, label: '도1', type: 'booth' },
        { id: 'B06', left: 5.2, top: 38.8, label: '도1', type: 'booth' },
        { id: 'B07', left: 5.2, top: 37.4, label: '도1', type: 'booth' },
        { id: 'B08', left: 5.2, top: 36.0, label: '도1', type: 'booth' },

        { id: 'B09', left: 7.5, top: 34.6, label: '도1', type: 'booth' },
        { id: 'B10', left: 7.5, top: 36.0, label: '도1', type: 'booth' },

        { id: 'B11', left: 8.8, top: 39, label: '도1', type: 'booth' },
        { id: 'B12', left: 8.8, top: 40.4, label: '도1', type: 'booth' },
        { id: 'B13', left: 8.8, top: 41.8, label: '도1', type: 'booth' },
        { id: 'B14', left: 8.8, top: 43.2, label: '도1', type: 'booth' },
        { id: 'B15', left: 10.4, top: 43.2, label: '도1', type: 'booth' },
        { id: 'B16', left: 12.0, top: 43.2, label: '도1', type: 'booth' },


        { id: 'B17', left: 15.9, top: 43.8, label: '도1', type: 'booth' },
        { id: 'B18', left: 15.9, top: 45.2, label: '도1', type: 'booth' },

        { id: 'B19', left: 13.0, top: 47.1, label: '도1', type: 'booth' },
        { id: 'B20', left: 11.6, top: 47.1, label: '도1', type: 'booth' },
        { id: 'B21', left: 10.2, top: 47.1, label: '도1', type: 'booth' },
        { id: 'B22', left: 8.8, top: 47.1, label: '도1', type: 'booth' },

    ];

    // type에 따라 아이콘 선택
    const getIcon = (type) => {
        switch (type) {
            case 'booth': return boothIcon;
            case 'photo': return photoIcon;
            case 'food': return foodIcon;
            case 'situation': return situationIcon;
            default: return boothIcon;
        }
    };

    const focusOnMarker = (marker) => {
        if (!transformRef.current) return;

        const { setTransform } = transformRef.current;
        const container = document
            .querySelector(".Booth-Container")
            .getBoundingClientRect();
        const mapWrap = document.querySelector(".map-wrap");

        if (container && mapWrap) {
            const scale = 3.0;

            // 마커 중심 좌표 (map-wrap 기준 px 좌표)
            const mapWidth = mapWrap.offsetWidth;
            const mapHeight = mapWrap.offsetHeight;
            const markerX = (marker.left / 100) * mapWidth;
            const markerY = (marker.top / 100) * mapHeight;

            // 컨테이너 중앙 좌표
            const containerCenterX = container.width / 2;
            const containerCenterY = container.height / 2;

            // offset 계산 (컨테이너 기준 중앙 정렬)
            const offsetX = containerCenterX - markerX * scale;
            const offsetY = containerCenterY - markerY * scale;

            setTransform(offsetX, offsetY, scale, 200);
        }
    };



    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
            <div id="boothAlways" className="Always">
                <Header />
                <div className="Booth-Container">
                    <TransformWrapper
                        ref={transformRef}
                        minScale={1}
                        maxScale={4}
                        initialScale={1.6}
                        limitToBounds={true}
                        animation={{ animationTime: 420, animationType: 'easeOutQuad' }}
                        onInit={(utils) => {
                            utils.setTransform(50, -500, 2, 0);
                        }}
                    >
                        <TransformComponent>
                            <div className="map-wrap"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                                    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

                                    console.log(`좌표: left=${xPercent.toFixed(1)}%, top=${yPercent.toFixed(1)}%`);
                                    alert(`좌표: left=${xPercent.toFixed(1)}%, top=${yPercent.toFixed(1)}%`);
                                }}
                            >
                                <Campusmap className="campus-svg" />

                                {import.meta.env.MODE === "development" &&
                                    markers.map((m) => (
                                        <img
                                            id={m.id}
                                            key={m.id}
                                            src={getIcon(m.type)}
                                            alt={m.label}
                                            className="marker-icon"
                                            style={{ left: `${m.left}%`, top: `${m.top}%` }}
                                        />
                                    ))}
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="BoothsContainer">
                    <div className='BottomMenu'>
                        {markers.map((m) => (
                            <button className='boothbox' key={m.id} onClick={() => focusOnMarker(m)}>
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    );
}
