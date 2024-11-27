import React, { useEffect, useState } from "react";

//import components
import Category from "../components/Category";
import TodayLog from "../components/TodayLog";
import TodayDrawing from "../components/TodayDrawing";

//import assets
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Rest from "../assets/icon_rest.svg";
import Achievements from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotions from "../assets/icon_emotions.svg";
import logButton from "../assets/icon_logButton.svg";
import ShowEye from "../assets/icon_showPW.svg";
import hideEye from "../assets/icon_hidePW.svg";

//import style
import styled from "styled-components";

const Container = styled.div`
    display : flex;
    flex-direction : column;
    height : 1119px
    width : 1280px
    justify-content: center;
`;

const InfoBox = styled.div`
    display: flex;
    width: 880px;
    height: 56px;
    padding: 10px;
    justify-content: center;
    margin-top : 24px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--Schemes-On-Primary, #FFF);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
`;

const WriteBox = styled.form`
    width : 880px;
    height : 887px;
`;

const WriteBoxText = styled.h2`
    color: var(--b100, #333);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const WriteBoxTextPoint = styled.span`
    color: var(--Schemes-Primary, #65558F);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Password = styled.div`
    position : relative;
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

const Input = styled.input`
    display: flex;
    height: 40px;
    width : 880px;
    padding: 10px 14px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 4px;
    border: 1px solid var(--b20, #EEE);
    background: var(--Schemes-On-Primary, #FFF);
    color: var(--b60, #333);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position : relative;
`;

const Eye = styled.div`
    position : absolute;
    right : 0;
    top : 55%;
`;

const Button = styled.button`
    display: flex;
    width: 202px;
    height: 48px;
    padding: 15px 0px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 8px;
    background: ${(props) => (props.disabled ? "#ccc" : "#65558F")};
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
    border : 0;
    margin-top : 50px;
    margin-left : 707px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const ButtonText = styled.h2`
    color: var(--b0, var(--Schemes-On-Primary, #FFF));
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;


export default function DailyLog() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState([
        {img : Communication, name : "소통"},
        {img : Thanks, name : "감사"},
        {img : Rest, name : "휴식"},
        {img : Achievements, name : "성취"},
        {img : Challenge, name : "도전"},
        {img : Emotions, name : "감정"},
    ]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [randomCategory, setRandomCategory] = useState("");
    const [logText, setLogText] = useState("");
    const [drawingImage, setDrawingImage] = useState("");  
    const isFormValid = name !== "" && password !== "" && selectedCategory !== "" && logText.trim() !== "";
    const [showPassword, setShowPassword] = useState(false);

    const getRandomCategory = () => {
        const randomIndex = Math.floor(Math.random() * category.length);
        return category[randomIndex].name;
    };

    useEffect(() => {
        setRandomCategory(getRandomCategory());
    }, [])

    function handleCategorySelect(categoryName) {
        setSelectedCategory(categoryName); 
    };

    function handleDrawingUpdate(image) {
        setDrawingImage(image); 
    };
    
    function handleLogTextChange(text) {
        setLogText(text); 
    };

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }



    function handleLog(e) {
        console.log(name);
        console.log(password);
        console.log(selectedCategory);
        console.log(logText);
        console.log(drawingImage);
    }

    return (
        <Container>
            <InfoBox>
                <WriteBoxText>오늘은 <WriteBoxTextPoint>{`'${randomCategory}'`}</WriteBoxTextPoint>에 관련하여 하루를 마무리해보면 어떨까요?</WriteBoxText>
            </InfoBox>
            <WriteBox>
                <Text>작성자*</Text>
                <Input 
                    placeholder="작성자를 작성해주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Password>
                    <Text>비밀번호*</Text>
                    <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="로그의 비밀번호를 설정해주세요(영문, 숫자 무관 4자리 이상)"
                        value={password}
                        minLength={4}
                        maxLength={20}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Eye onClick={handleShowPassword}>{showPassword ? <img src={ShowEye} /> : <img src={hideEye} />}</Eye>
                </Password>
                <Text>카테고리*</Text>
                <Category category={category} select={handleCategorySelect} selectedCategory={selectedCategory}/>
                <TodayLog value={logText} onChange={handleLogTextChange}/>
                <TodayDrawing onDrawingUpdate={handleDrawingUpdate}/>
                <Button disabled={!isFormValid || password.length < 4 || password.length > 20} onClick={handleLog}>
                    <ButtonText>로그 작성하러 가기</ButtonText>
                    <img src={logButton} />
                </Button>
            </WriteBox>
        </Container>
    )
}