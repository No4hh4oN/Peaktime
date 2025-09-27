import Header from '../components/header';
import '../assets/styles/common.css';
import './Booth.css';

import Campusmap from '../assets/svg/Campusmap.svg?react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useMemo, useRef } from "react";

import boothIcon from '../assets/svg/booth.svg';
import photoIcon from '../assets/svg/photo.svg';
import foodIcon from '../assets/svg/food.svg';
import situationIcon from '../assets/svg/situation.svg';
import eatIcon from '../assets/svg/eat.svg';

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
        // 솔광    
        { id: 'C01', left: 7, top: 49.5, type: 'booth' },
        { id: 'C03', left: 10.5, top: 49.5, type: 'booth' },

        { id: 'C05', left: 13.1, top: 50.8, type: 'photo' },
        { id: 'C06', left: 13.1, top: 52.8, type: 'photo' },
        { id: 'C07', left: 13.1, top: 54.8, type: 'photo' },
        { id: 'C08', left: 13.1, top: 56.8, type: 'photo' },

        { id: 'C09', left: 10.5, top: 58.0, type: 'booth' },
        { id: 'C11', left: 7, top: 58.0, type: 'booth' },

        { id: 'C13', left: 4.8, top: 55.8, type: 'booth' },
        { id: 'C15', left: 4.8, top: 51.8, type: 'booth' },

        // 도서관 부스
        { id: 'B01', left: 3.8, top: 44.7, type: 'booth' },

        { id: 'B03', left: 5.2, top: 42.0, type: 'booth' },
        { id: 'B05', left: 5.2, top: 39.5, type: 'booth' },
        { id: 'B07', left: 5.2, top: 37.0, type: 'booth' },

        { id: 'B09', left: 7.2, top: 34.8, type: 'booth' },
        { id: 'B10', left: 7.2, top: 36.5, type: 'booth' },

        { id: 'B13', left: 8.3, top: 39.0, type: 'booth' },

        { id: 'B15', left: 11.5, top: 41.8, type: 'booth' },
        { id: 'B16', left: 12.0, top: 43.2, type: 'booth' },

        { id: 'B17', left: 15.0, top: 44.5, type: 'booth' },
        { id: 'B19', left: 11.5, top: 47.1, type: 'booth' },
        { id: 'B21', left: 8, top: 47.1, type: 'booth' },
        
        // 푸드트럭
        { id: 'D00', left: 18.1, top: 58.1, type: 'food' },
        { id: 'D01', left: 22.1, top: 58.1, type: 'food' },
        { id: 'D02', left: 26.1, top: 58.1, type: 'food' },
        { id: 'D03', left: 28.1, top: 63.1, type: 'food' },
        { id: 'D04', left: 24.1, top: 63.1, type: 'food' },
        { id: 'D05', left: 20.1, top: 63.1, type: 'food' },
        { id: 'D06', left: 16.1, top: 63.1, type: 'food' },
        
        // 피크닉존 부스
        { id: 'A00', left: 35.3, top: 32.3, type: 'eat' },
        { id: 'A01', left: 29.3, top: 38.3, type: 'eat' },

        { id: 'A13', left: 33.4, top: 42.8, type: 'situation' },
        { id: 'A14', left: 31.6, top: 42.8, type: 'situation' },
        { id: 'A15', left: 29.8, top: 42.8, type: 'situation' },
        { id: 'A16', left: 28.0, top: 42.8, type: 'situation' },
        { id: 'A17', left: 26.2, top: 42.8, type: 'booth' },
    ];

    const [activeMarkerId, setActiveMarkerId] = useState(null);

    // type에 따라 아이콘 선택
    const getIcon = (type) => {
        switch (type) {
            case 'booth': return boothIcon;
            case 'photo': return photoIcon;
            case 'food': return foodIcon;
            case 'situation': return situationIcon;
            case 'eat': return eatIcon;
            default: return boothIcon;
        }
    };

    // 포커싱
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
    const [pending, setPending] = useState({});
    const [loading, setLoading] = useState(false);

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
        if (!booth) return;

        if (pending[booth.id]) return;
        setPending(prev => ({ ...prev, [booth.id]: true }));

        const prevIs = !!booth.isBookmark;
        const delta = prevIs ? -1 : 1;

        setBooths(prev =>
            prev.map(b =>
                b.id === booth.id
                    ? {
                        ...b,
                        isBookmark: !prevIs,
                        bookmarkCount: Math.max(0, (b.bookmarkCount ?? 0) + delta),
                    }
                    : b
            )
        );

        try {
            if (prevIs) {
                await cancelBookmark(booth.id);
            } else {
                await doBookmark(booth.id);
            }
        } catch (err) {
            setBooths(prev =>
                prev.map(b =>
                    b.id === booth.id
                        ? {
                            ...b,
                            isBookmark: prevIs,
                            bookmarkCount: Math.max(0, (b.bookmarkCount ?? 0) - delta),
                        }
                        : b
                )
            );
        } finally {
            setPending(prev => ({ ...prev, [booth.id]: false }));
        }
    };

    const boothMap = useMemo(() => {
        const m = new Map();
        for (const b of booths) m.set(b.locateId, b);
        return m;
    }, [booths]);

    const displayMarkers = useMemo(() => {
        return markers
            .filter(m => boothMap.has(m.id))
            .map(m => ({
                ...m,
                booth: boothMap.get(m.id) ?? null,
            }));
    }, [markers, boothMap]);



    // 하단 정보 필터링
    const FILTERS = [
        { key: 'all', label: '전체' },
        { key: 'booth', label: '부스', types: ['booth'] },
        { key: 'photo', label: '포토', types: ['photo'] },
        { key: 'foodEat', label: '음식', types: ['food', 'eat'] },
        { key: 'situation', label: '상황실', types: ['situation'] },
    ];

    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredMarkers = useMemo(() => {
        if (selectedFilter === 'all') return displayMarkers;
        const def = FILTERS.find(f => f.key === selectedFilter);
        if (!def?.types) return displayMarkers;
        const typeSet = new Set(def.types);
        return displayMarkers.filter(m => typeSet.has(m.type));
    }, [displayMarkers, selectedFilter]);

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
                        onInit={(utils) => {
                            apiRef.current = utils;
                            utils.setTransform(50, -500, 2, 0);
                        }}
                    >
                        <TransformComponent>
                            <div className="map-wrap" onClick={() => { setActiveMarkerId(null); }}>
                                <Campusmap className="campus-svg" />

                                {displayMarkers.map((m) => (
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
                                    const am = displayMarkers.find(b => b.id === activeMarkerId);
                                    if (!am) return null;
                                    const label = am.booth?.name;
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
                    <div className="FilterBar">
                        {FILTERS.map(f => {
                            const count = f.key === 'all'
                                ? displayMarkers.length
                                : displayMarkers.filter(m => (f.types ?? []).includes(m.type)).length;

                            return (
                                <button
                                    key={f.key}
                                    className={`filter-btn ${selectedFilter === f.key ? 'active' : ''}`}
                                    onClick={() => setSelectedFilter(f.key)}
                                >
                                    {f.label}
                                    {/* <span className="count-badge">{count}</span> */}
                                </button>
                            );
                        })}
                    </div>
                    <div className='BottomMenu'>
                        {!loading && filteredMarkers.map((m) => (
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
                                            className={`BookmarkIcon ${pending[m.booth?.id] ? 'is-pending' : ''}`}
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
