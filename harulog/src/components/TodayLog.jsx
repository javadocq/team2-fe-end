import React from "react";

//import style
import styled from "styled-components";


const Container = styled.div`
    width: 880px;
    height: 312px;
`;

const Text = styled.h2`
    color: var(--b100, #333);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top : 24px;
`;

const TextArea = styled.textarea`
    display: flex;
    width : 852px;
    height: 200px;
    padding: 27px;
    justify-content: center;
    align-items: center;
    resize : none;
    gap: 10px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid var(--b20, #EEE);
    background: var(--Schemes-On-Primary, #FFF);
    
    color: var(--b100, #333);
    font-family: "UhBee Seulvely";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    
    &::placeholder {
        disflex : center;
        color: var(--b60, #999);
        font-family: "UhBee Seulvely";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 180px;
        text-align: center;  
    }
`;

export default function TodayLog({ value, onChange }) {

    return(
        <Container>
            <Text>오늘의 로그*</Text>
            <TextArea 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="오늘의 한마디를 남겨보아요*"
                maxLength="100"
            />
        </Container>
    );
}