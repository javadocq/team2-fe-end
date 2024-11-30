import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
//import components
import Category from "../components/Category";
import TodayLog from "../components/TodayLog";
import TodayDrawing from "../components/TodayDrawing";
import { BASE_URL } from "../components/BASE_URL";

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
    height : 1150px;
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
    position: absolute;
    right: 14px;  /* 패딩 안쪽 위치 고정 */
    top: 65px;  /* 입력 필드의 정중앙에 위치 */
    transform: translateY(-50%); /* 중앙 정렬 */
    z-index: 1; /* 비밀번호 안내문이 생겨도 아이콘이 위로 올라오게 */
    cursor: pointer;
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
    const queryClient = useQueryClient();  // 추가
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCategoryId } = location.state || {};
    const keyword = searchParams.get("keyword");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState([
        {id : 1, img : Communication, name : "소통"},
        {id : 2, img : Thanks, name : "감사"},
        {id : 3, img : Rest, name : "휴식"},
        {id : 4, img : Achievements, name : "성취"},
        {id : 5, img : Challenge, name : "도전"},
        {id : 6, img : Emotions, name : "감정"},
    ]);
    const [randomCategory, setRandomCategory] = useState("");
    const [logText, setLogText] = useState("");
    const [drawingImage, setDrawingImage] = useState("");  
    const isFormValid = name !== "" && password !== "" && selectedCategoryId !== 0 && logText.trim() !== "";
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryId || null);
    const getRandomCategory = () => {
        const randomIndex = Math.floor(Math.random() * category.length);
        return category[randomIndex].name;
    };

    useEffect(() => {
        if (selectedCategoryId) {
          setSelectedCategory(selectedCategoryId);
        }
    }, [selectedCategoryId])

    useEffect(() => {
        setRandomCategory(getRandomCategory());
    }, []);

    function handleCategorySelect(categoryId) {
        setSelectedCategory(categoryId); 
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
    function handlePasswordChange(e) {
        const value = e.target.value;
        setPassword(value);
        setIsPasswordValid(value.length >= 4);
    }



    function handleLog(e) {
        e.preventDefault();

        if (password.length < 4 || password.length > 20) {
            alert("비밀번호는 4자리 이상 20자리 이하로 입력해야 합니다.");
            return;
        }

        const createDiary = async() => {
            try {
                const response = await axios.post(`${BASE_URL}/diaries`, {
                    image_data: drawingImage,
                    category_id: selectedCategory,
                    content: logText,
                    username: name,
                    password: password
                });
                console.log(response.data.category_id);
                // 캐시 무효화를 기다림
                await queryClient.invalidateQueries({ queryKey: ['diaries'] });
                // 데이터가 갱신된 후 페이지 이동
                window.scrollTo(0, 0);
                navigate('/');
            } catch(error) {
                console.error("failed post diary : ", error);
            }
        };
        createDiary();
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
                        placeholder="로그의 비밀번호를 설정해주세요 (영문, 숫자 무관 4자리 이상)"
                        value={password}
                        minLength={4}
                        maxLength={20}
                        required
                        onChange={(e) => handlePasswordChange(e)}
                        style={{
                            borderColor: isPasswordValid ? "#EEE" : "red",
                            outlineColor: isPasswordValid ? "" : "red",
                        }}
                    />
                    <Eye onClick={handleShowPassword}>{showPassword ? <img src={ShowEye} /> : <img src={hideEye} />}</Eye>
                    {!isPasswordValid && <p style={{ color: "red" }}>비밀번호는 4자리 이상이어야 합니다.</p>}
                </Password>
                <Text>카테고리*</Text>
                <Category category={category} select={handleCategorySelect} BeforeSelected={selectedCategoryId}/>
                <TodayLog value={logText} onChange={handleLogTextChange}/>
                <TodayDrawing onDrawingUpdate={handleDrawingUpdate}/>
                <Button disabled={!isFormValid || password.length < 4 || password.length > 20} onClick={handleLog}>
                    <ButtonText>로그 작성 완료</ButtonText>
                    <img src={logButton} />
                </Button>
            </WriteBox>
        </Container>
    )
}