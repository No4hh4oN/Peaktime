import Header from '../components/header';
import '../assets/styles/common.css';
import './Booth.css';

import Concertmap from '../assets/svg/Concertmap.svg?react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRef, useState } from "react";

import festaLogo from "/images/festaLogo.png";
import cavinetIcon from '../assets/svg/cavinet.svg';
import cameraIcon from '../assets/svg/camera.svg';
import emsIcon from '../assets/svg/ems.svg';
import fittingIcon from '../assets/svg/fitting.svg';
import situationIcon from '../assets/svg/situation.svg';

import BottomSheet from '../components/BottomSheet';

export default function Concert() {
  const apiRef = useRef(null);

  const markers = [
    { id: 'E01', left: 22.0, top: 40.0, type: 'situation', description: '합동상황실입니다.' },
    { id: 'E02', left: 25.0, top: 40.0, type: 'cavinet', description: '물품보관소입니다.' },
    { id: 'E03', left: 24.2, top: 60.8, type: 'ems', description: '구급차입니다.' },
    { id: 'E04', left: 26.0, top: 63.5, type: 'camera', description: '카메라입니다.' },
    { id: 'E05', left: 27.8, top: 62.1, type: 'fitting', description: '탈의실입니다.' },
  ];

  const TYPE_LABELS = {
    ALL: '전체',
    situation: '상황실',
    cavinet: '물품보관소',
    ems: '구급차',
    camera: '카메라',
    fitting: '탈의실',
  };

  const [activeMarkerId, setActiveMarkerId] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'cavinet': return cavinetIcon;
      case 'camera': return cameraIcon;
      case 'ems': return emsIcon;
      case 'fitting': return fittingIcon;
      case 'situation': return situationIcon;
      default: return situationIcon;
    }
  };

  const focusOnMarker = (marker) => {
    const api = apiRef.current;
    if (!api) return;

    const container = document.querySelector(".Booth-Container")?.getBoundingClientRect();
    const mapWrap = document.querySelector(".map-wrap");
    setActiveMarkerId(marker.id);

    if (container && mapWrap) {
      const scale = 3.0;
      const mapWidth = mapWrap.offsetWidth;
      const mapHeight = mapWrap.offsetHeight;
      const markerX = (marker.left / 100) * mapWidth;
      const markerY = (marker.top / 100) * mapHeight;
      const containerCenterX = container.width / 2;
      const containerCenterY = container.height / 2;
      const offsetX = containerCenterX - markerX * scale;
      const offsetY = containerCenterY - markerY * scale;

      api.setTransform(offsetX, offsetY, scale, 200);
    }
  };

  const handleMapClick = (e) => {
    setActiveMarkerId(null);
  };

  return (
    <div className="ViewBox">
      <div className="ResponsiveScreen1">
        <img src={festaLogo} alt="" />
      </div>
      <div id="boothAlways" className="Always">
        <Header />
        <div className="Booth-Container">
          <TransformWrapper
            minScale={1}
            maxScale={4}
            initialScale={1.6}
            limitToBounds={true}
            animation={{ animationTime: 420, animationType: 'easeOutQuad' }}
            ref={apiRef}
            onInit={(utils) => {
              utils.setTransform(50, -500, 2, 0);
            }}
          >
            <TransformComponent>
              <div className="map-wrap" onClick={handleMapClick}>
                <Concertmap className="campus-svg" />
                {markers.map((m) => (
                  <img
                    id={m.id}
                    key={m.id}
                    src={getIcon(m.type)}
                    alt={`${TYPE_LABELS[m.type]} ${m.id}`}
                    className="marker-icon"
                    style={{ left: `${m.left}%`, top: `${m.top}%` }}
                    onClick={(e) => { e.stopPropagation(); focusOnMarker(m); }}
                  />
                ))}

                {(() => {
                  if (!activeMarkerId) return null;
                  const am = markers.find(b => b.id === activeMarkerId);
                  if (!am) return null;
                  return (
                    <div
                      className="booth-tooltip"
                      style={{ left: `${am.left}%`, top: `${am.top}%` }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="tooltip-title">{TYPE_LABELS[am.type]} ({am.id})</div>
                      {am.description && <div className="tooltip-desc">{am.description}</div>}
                    </div>
                  );
                })()}
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
      <div className="ResponsiveScreen2">
        <div className='ResponsiveScreen2-div'>
          <span id=''>
            20<br />
            25
          </span>
          <span>
            SAHMYOOK<br />
            UNIVERSITY<br />
            FESTIVAL
          </span>
        </div>
      </div>
    </div>
  );
}
