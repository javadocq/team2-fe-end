import React, { useState, useRef, useEffect } from 'react';

//import assets
import Draw from "../assets/icon_checked_draw.svg";
import Un_Draw from "../assets/icon_unchecked_draw.svg";
import Eraser from "../assets/icon_checked_eraser.svg";
import Un_Eraser from "../assets/icon_unchecked_eraser.svg";
import Initialize from "../assets/icon_unchecked_refresh.svg";

//import style
import styled from "styled-components";

const Container = styled.div`
    width: 880px;
    height: 331px;
    position: relative;
`;

const Text = styled.h2`
    color: var(--b100, #333);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const PlaceHolderText = styled.h2`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    color: var(--b60, #999);
    font-family: "UhBee Seulvely";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Canvas = styled.canvas`
    display: flex;
    padding: 10px 14px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    border-radius: 4px;
    border: 1px solid var(--b20, #EEE);
    background: var(--Schemes-On-Primary, #FFF);
`;

const DrawTools = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 1px;
    border-radius: 4px;
    background: var(--b0, #FFF);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
    position: absolute;
    top: 93%;
    right : -2%;
`;

const DrawIcon = styled.img`
    border-radius : 4px 0px 0px 4px;
    background: ${(props) => (props.selected ? 'var(--b10, #FAFAFA)' : 'var(--b0, #FFF)')};
    &:hover { 
        background: var(--b20, #EEE);
        border-radius : 4px 0px 0px 4px;
    }
`;

const EraserIcon = styled.img`
    background: ${(props) => (props.selected ? 'var(--b10, #FAFAFA)' : 'var(--b0, #FFF)')};
    &:hover { 
        background: var(--b20, #EEE);
    }
`;

const RefreshIcon = styled.img`
    &:hover {
        background: var(--b20, #EEE);
        border-radius : 0px 4px 4px 0px;
    }
`;

const EraserOverlay = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(200, 200, 200, 0.5);
    pointer-events: none;
`;

export default function TodayDrawing({ onDrawingUpdate }) {
    const canvasRef = useRef(null);
    const [useCtx, setUseCtx] = useState(null);
    const [painting, setPainting] = useState(false);
    const [showText, setShowText] = useState(true);
    const [selectedTool, setSelectedTool] = useState('draw');
    const [eraserPosition, setEraserPosition] = useState(null);
    const canvasHistory = useRef([]); 
    const historyIndex = useRef(-1);


    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 880; 
        canvas.height = 300; 
        const ctx = canvas.getContext("2d"); 
        ctx.lineJoin = "round"; 
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#333';
        setUseCtx(ctx);

        const handleUndo = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                undoCanvas();
            }
        };
        window.addEventListener('keydown', handleUndo);
        return () => window.removeEventListener('keydown', handleUndo);
    }, [useCtx]);

    function draw(e) {
        if (!useCtx) return;

        const positionX = e.nativeEvent.offsetX -15; //현재 x값 위치
        const positionY = e.nativeEvent.offsetY -10; //현재 Y값 위치

        if (selectedTool === 'eraser') {
            setEraserPosition({ x: positionX, y: positionY });
        }

        if (!painting) {
            useCtx.beginPath(); //선이 이어지지 않도록 초기화
            useCtx.moveTo(positionX, positionY);
        } else {
            useCtx.lineTo(positionX, positionY);
            useCtx.stroke();
        }


    }

    function handleMouseDown() {
        setPainting(true);
        setShowText(false); // 그림 그리기 시작하면 텍스트 숨기기

    }

    function isCanvasBlank(canvas) {
        const ctx = canvas.getContext('2d');
        const pixelBuffer = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
        return !pixelBuffer.some(color => color !== 0); // 색상이 전부 0이면 빈 캔버스
    }

    function handleMouseUp() {
        setPainting(false);
        saveCanvasState();
        if (onDrawingUpdate && canvasRef.current) {
            if (!isCanvasBlank(canvasRef.current)) { // 빈 캔버스가 아닌 경우에만 업데이트
                const imageData = canvasRef.current.toDataURL("image/png");
                onDrawingUpdate(imageData);
            }
        }
        setEraserPosition(null);
    }
    
    function handleDraw() {
        setSelectedTool('draw');
        useCtx.beginPath();
        useCtx.strokeStyle = '#333'; 
        useCtx.lineWidth = 3;
    }  

    function handleEraser() {
        setSelectedTool('eraser');
        if(useCtx) {
            useCtx.strokeStyle = '#FFF';
            useCtx.lineWidth = 20;
        }
    }

    function handleInitialize() {
        if (useCtx && canvasRef.current) {
            useCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            useCtx.beginPath(); 
            useCtx.strokeStyle = '#333'; 
            setSelectedTool('draw'); 
            canvasHistory.current = [];
            useCtx.lineWidth = 3;
            setShowText(true); 
        }
    }

    function saveCanvasState() {
        const canvas = canvasRef.current;
        const newHistory = canvas.toDataURL();
        
        // history 배열에 이전 상태가 남아 있으면 자르기
        if (historyIndex.current < canvasHistory.current.length - 1) {
            canvasHistory.current = canvasHistory.current.slice(0, historyIndex.current + 1);
        }
    
        // 새로운 상태만 저장
        if (newHistory !== canvasHistory.current[canvasHistory.current.length - 1]) {
            canvasHistory.current.push(newHistory);
            console.log("11");
            historyIndex.current++;
        }
    }

    function undoCanvas() {
        if (historyIndex.current > 0 && useCtx) {  // useCtx가 초기화되었는지 확인
            historyIndex.current--;
            const img = new Image();
            img.src = canvasHistory.current[historyIndex.current];
            img.onload = () => {
                if (useCtx) {  // 다시 한 번 useCtx가 유효한지 확인
                    useCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    useCtx.drawImage(img, 0, 0);
                }
            };
        }
    }


    return (
        <Container>
            <Text>오늘의 순간</Text>
            {showText && (
                <PlaceHolderText>그림도 한번 남겨보면 어떨까요?</PlaceHolderText>
            )}
            <Canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={e => draw(e)}
                onMouseLeave={handleMouseUp}
            />
            {eraserPosition && selectedTool === 'eraser' && (
                <EraserOverlay
                    style={{ top: eraserPosition.y + 30, left: eraserPosition.x + 5 }}
                />
            )}
            <DrawTools>
                <DrawIcon
                    src={selectedTool === 'draw' ? Draw : Un_Draw}
                    selected={selectedTool === 'draw'}
                    onClick={() => handleDraw()}
                />
                <EraserIcon
                    src={selectedTool === 'eraser' ? Eraser : Un_Eraser}
                    selected={selectedTool === 'eraser'}
                    onClick={() => handleEraser()}
                />
                <RefreshIcon 
                    src={Initialize}
                    onClick={() => handleInitialize()}
                />
            </DrawTools>
        </Container>
    );
}
