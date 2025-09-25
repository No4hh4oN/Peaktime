import { useState, useRef } from "react";
import "../assets/styles/bottomsheet.css";

export default function BottomSheet({ children }) {
    const sheetRef = useRef(null);
    const [height, setHeight] = useState(200); // 초기 높이(px)
    const [startY, setStartY] = useState(null);
    const [currentHeight, setCurrentHeight] = useState(200);

    const minHeight = 100;
    const maxHeight = window.innerHeight; // 헤더 빼고 거의 풀화면

    const [isDragging, setIsDragging] = useState(false);

    const handleStart = (e) => {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setStartY(clientY);
        setCurrentHeight(height);
        setIsDragging(true);
    };

    const handleMove = (e) => {
        if (startY === null) return;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = startY - clientY;
        let newHeight = currentHeight + deltaY;

        if (newHeight < minHeight) newHeight = minHeight;
        if (newHeight > maxHeight) newHeight = maxHeight;

        setHeight(newHeight);
    };

    const handleEnd = () => {
        setStartY(null);
        setIsDragging(false);
    };
    return (
        <div
            className="BottomSheet"
            style={{
                height,
                transition: isDragging ? "none" : "height 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
        >
            <div
                className="BottomSheet-Handle"
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                <div className="Handle-Bar" />
            </div>

            <div className="BottomSheet-Content">{children}</div>
        </div>
    );
}
