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

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
    getAllBooths,
    getImageById,
    getBookmarkCountByBooth,
    getIsBookmark,
    doBookmark,
    cancelBookmark,
} from "../api/booth";
import Marquee from "react-fast-marquee";
import saved from '/icons/saved.png';
import delbookmark from '/icons/delbookmark.png';
import BottomSheet from '../components/BottomSheet';

export default function Booth() {
    const apiRef = useRef(null);

    const markers = [
        // 피크닉존 부스
        { id: 'A01', left: 28.2, top: 29, type: 'booth' },
        { id: 'A02', left: 30.2, top: 29, type: 'booth' },
        { id: 'A03', left: 32.2, top: 29, type: 'booth' },
        { id: 'A04', left: 34.2, top: 29, type: 'booth' },
        { id: 'A05', left: 36.2, top: 29, type: 'booth' },
        { id: 'A06', left: 38.2, top: 29, type: 'booth' },

        { id: 'A07', left: 39.6, top: 30.3, type: 'booth' },
        { id: 'A08', left: 39.6, top: 32.3, type: 'booth' },
        { id: 'A09', left: 39.6, top: 34.3, type: 'booth' },
        { id: 'A10', left: 39.6, top: 36.3, type: 'booth' },
        { id: 'A11', left: 39.6, top: 38.3, type: 'booth' },
        { id: 'A12', left: 39.6, top: 40.3, type: 'booth' },

        { id: 'A13', left: 32.4, top: 42.8, type: 'situation' },
        { id: 'A14', left: 31.0, top: 42.8, type: 'situation' },
        { id: 'A15', left: 29.6, top: 42.8, type: 'situation' },
        { id: 'A16', left: 28.2, top: 42.8, type: 'situation' },

        // 솔광    
        { id: 'C01', left: 6.1, top: 48.8, type: 'booth' },
        { id: 'C02', left: 8.1, top: 48.8, type: 'booth' },
        { id: 'C03', left: 10.1, top: 48.8, type: 'booth' },
        { id: 'C04', left: 12.1, top: 48.8, type: 'booth' },

        { id: 'C05', left: 13.8, top: 50.8, type: 'photo' },
        { id: 'C06', left: 13.8, top: 52.8, type: 'photo' },
        { id: 'C07', left: 13.8, top: 54.8, type: 'photo' },
        { id: 'C08', left: 13.8, top: 56.8, type: 'photo' },

        { id: 'C09', left: 6.1, top: 58.5, type: 'booth' },
        { id: 'C10', left: 8.1, top: 58.5, type: 'booth' },
        { id: 'C11', left: 10.1, top: 58.5, type: 'booth' },
        { id: 'C12', left: 12.1, top: 58.5, type: 'booth' },

        { id: 'C13', left: 3.8, top: 50.5, type: 'booth' },
        { id: 'C14', left: 3.8, top: 52.5, type: 'booth' },
        { id: 'C15', left: 3.8, top: 54.5, type: 'booth' },
        { id: 'C16', left: 3.8, top: 56.5, type: 'booth' },

        // 푸드트럭
        { id: 'D01', left: 18.1, top: 58.1, type: 'food' },
        { id: 'D02', left: 26.1, top: 58.1, type: 'food' },
        { id: 'D03', left: 28.1, top: 63.1, type: 'food' },
        { id: 'D04', left: 24.1, top: 63.1, type: 'food' },
        { id: 'D05', left: 20.1, top: 63.1, type: 'food' },
        { id: 'D06', left: 16.1, top: 63.1, type: 'food' },

        // 도서관 부스
        { id: 'B01', left: 3.8, top: 44.7, type: 'booth' },
        { id: 'B02', left: 5.2, top: 44.7, type: 'booth' },

        { id: 'B03', left: 5.2, top: 43.0, type: 'booth' },
        { id: 'B04', left: 5.2, top: 41.6, type: 'booth' },
        { id: 'B05', left: 5.2, top: 40.2, type: 'booth' },
        { id: 'B06', left: 5.2, top: 38.8, type: 'booth' },
        { id: 'B07', left: 5.2, top: 37.4, type: 'booth' },
        { id: 'B08', left: 5.2, top: 36.0, type: 'booth' },

        { id: 'B09', left: 7.5, top: 34.6, type: 'booth' },
        { id: 'B10', left: 7.5, top: 36.0, type: 'booth' },

        { id: 'B11', left: 8.8, top: 39, type: 'booth' },
        { id: 'B12', left: 8.8, top: 40.4, type: 'booth' },
        { id: 'B13', left: 8.8, top: 41.8, type: 'booth' },
        { id: 'B14', left: 8.8, top: 43.2, type: 'booth' },
        { id: 'B15', left: 10.4, top: 43.2, type: 'booth' },
        { id: 'B16', left: 12.0, top: 43.2, type: 'booth' },


        { id: 'B17', left: 15.9, top: 43.8, type: 'booth' },
        { id: 'B18', left: 15.9, top: 45.2, type: 'booth' },

        { id: 'B19', left: 13.0, top: 47.1, type: 'booth' },
        { id: 'B20', left: 11.6, top: 47.1, type: 'booth' },
        { id: 'B21', left: 10.2, top: 47.1, type: 'booth' },
        { id: 'B22', left: 8.8, top: 47.1, type: 'booth' },

    ];


    const [activeMarkerId, setActiveMarkerId] = useState(null);

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

    const navigate = useNavigate();
    const [booths, setBooths] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1) fetch 함수를 useCallback으로 분리
    const loadBooths = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllBooths();
            const boothsWithExtra = await Promise.all(
                res.map(async (booth) => {
                    let imageUrl = null;
                    let bookmarkCount = 0;
                    let isBookmark = false;

                    if (booth.imageId) {
                        try {
                            const imgRes = await getImageById(booth.imageId);
                            imageUrl = imgRes?.url ?? null;
                        } catch { }
                    }

                    try {
                        const countRes = await getBookmarkCountByBooth(booth.id);
                        bookmarkCount = countRes?.count ?? countRes ?? 0;
                    } catch { }

                    try {
                        const isBookmarkRes = await getIsBookmark(booth.id);
                        isBookmark = !!isBookmarkRes;
                    } catch { }

                    return { ...booth, imageUrl, bookmarkCount, isBookmark };
                })
            );
            setBooths(boothsWithExtra);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBooths();
    }, [loadBooths]);

    const handleToggleBookmark = async (booth, e) => {
        e.stopPropagation();
        try {
            if (booth.isBookmark) {
                await cancelBookmark(booth.id);
            } else {
                await doBookmark(booth.id);
            }
            await loadBooths();
        } catch (err) {
            console.error("북마크 처리 실패:", err);
        }
    };

    const boothMarkers = markers.map((marker) => {
        const booth = booths.find((b) => b.locateId === marker.id);
        return {
            ...marker,
            booth,
        };
    });

    const handleMapClick = (e) => {
  // 화면 좌표 기준 최상단 요소
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const markerEl = el?.closest?.('.marker-icon');
  if (!markerEl) return; // 아이콘이 아니면 무시

  const id = markerEl.id;
  const m = boothMarkers.find(b => b.id === id);
  if (m) {
    setActiveMarkerId(m.id);
    focusOnMarker(m);
  }
};

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
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
                            <div
                                className="map-wrap"
                                onClick={() => {
                                    // 좌표 디버깅 용
                                    // const rect = e.currentTarget.getBoundingClientRect();
                                    // const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                                    // const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
                                    // console.log(`좌표: left=${xPercent.toFixed(1)}%, top=${yPercent.toFixed(1)}%`);
                                    setActiveMarkerId(null);
                                }}
                            >
                                <Campusmap className="campus-svg" />

                                {boothMarkers.map((m) => (
                                    <img
                                        id={m.id}
                                        key={m.id}
                                        src={getIcon(m.type)}
                                        alt={m.booth?.name || m.id}
                                        className="marker-icon"
                                        style={{ left: `${m.left}%`, top: `${m.top}%` }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            focusOnMarker(m);
                                        }}
                                    />
                                ))}

                                {(() => {
                                    if (!activeMarkerId) return null;
                                    const am = boothMarkers.find(b => b.id === activeMarkerId);
                                    if (!am) return null;
                                    const label = am.booth?.name || am.id;
                                    return (
                                        <div
                                            className="booth-tooltip"
                                            style={{ left: `${am.left}%`, top: `${am.top}%` }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {label}
                                        </div>
                                    );
                                })()}
                            </div>
                        </TransformComponent>
                    </TransformWrapper>
                </div>

                <BottomSheet>
                    <div className='BottomMenu'>
                        {!loading && boothMarkers.map((m) => (
                            <div
                                className='boothbox'
                                key={m.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMarkerId(m.id);
                                    focusOnMarker(m);
                                }}
                            >
                                {m.booth?.imageUrl ? (
                                    <img className="Booth-Logo" src={m.booth.imageUrl} alt={m.booth.name} width="200" />
                                ) : (
                                    <p>이미지 없음</p>
                                )}
                                <div className="Booth-Info">
                                    <span className='Booth-Info-Name'>{m.booth?.name || m.id}</span>
                                    <span className='Booth-Info-Desc'>{m.booth?.description}</span>
                                    <div className="Booth-Info-KeyWords">
                                        {[m.booth?.keyword1, m.booth?.keyword2, m.booth?.keyword3]
                                            .filter((kw) => kw && kw.trim() !== "")
                                            .map((kw, idx) => {
                                                const isLong = kw.length > 3;

                                                return (
                                                    <span key={idx}>
                                                        {isLong ? (
                                                            <Marquee pauseOnHover={true} gradient={false} speed={10}>
                                                                {kw}
                                                            </Marquee>
                                                        ) : (
                                                            kw
                                                        )}
                                                    </span>
                                                );
                                            })}
                                    </div>
                                </div>
                                {m.booth && (
                                    <div className="Booth-Bookmark">
                                        <img
                                            className='BookmarkIcon'
                                            src={m.booth.isBookmark ? saved : delbookmark}
                                            alt="저장"
                                            onClick={(e) => handleToggleBookmark(m.booth, e)}
                                        />
                                        <span className='Bookmark-Count'>{m.booth.bookmarkCount > 99 ? "99+" : m.booth.bookmarkCount}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </BottomSheet>
            </div>
            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    );
}
