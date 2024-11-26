import React, { useState, useRef, useEffect } from 'react';

//import assets
import Draw from "../assets/icon_draw.svg";
import Eraser from "../assets/icon_eraser.svg";
import Initialize from "../assets/icon_refresh.svg";

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
    margin-top: 24px;
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

export default function TodayDrawing({ onDrawingUpdate }) {
    const canvasRef = useRef(null);
    const [useCtx, setUseCtx] = useState(null);
    const [painting, setPainting] = useState(false);
    const [showText, setShowText] = useState(true);
    const [selectedTool, setSelectedTool] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 880; 
        canvas.height = 300; 
        const ctx = canvas.getContext("2d"); 
        ctx.lineJoin = "round"; 
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#333';
        setUseCtx(ctx);
    }, []);

    function draw(e) {
        const positionX = e.nativeEvent.offsetX; //현재 x값 위치
        const positionY = e.nativeEvent.offsetY; //현재 Y값 위치
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

    function handleMouseUp() {
        setPainting(false);
        if (onDrawingUpdate) {
            const imageData = canvasRef.current.toDataURL("image/png");
            onDrawingUpdate(imageData);
        }
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
            useCtx.lineWidth = 10;
        }
    }

    function handleInitialize() {
        if (useCtx && canvasRef.current) {
            useCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            useCtx.beginPath(); 
            useCtx.strokeStyle = '#333'; 
            setSelectedTool(null); 
            setShowText(true); 
        }
    }

    return (
        <Container>
            <Text>오늘의 순간*</Text>
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
            <DrawTools>
                <DrawIcon
                    src={Draw}
                    selected={selectedTool === 'draw'}
                    onClick={() => handleDraw()}
                />
                <EraserIcon
                    src={Eraser}
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
