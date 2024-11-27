import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import mockData from "../mocks/mockData.json";
import UpButton from "../components/UpButton";
//import assets
import Drawing from "../assets/icon_drawing.svg";
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Relax from "../assets/icon_relax.svg";
import Achievement from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotion from "../assets/icon_emotions.svg";
import Pencil from "../assets/icon_pencil.svg";

const categoryImages = {
    "소통": Communication,
    "감사": Thanks,
    "휴식": Relax,
    "성취": Achievement,
    "도전": Challenge,
    "감정": Emotion
};

const DailyDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [like, setLike] = useState(false);
    
    // mockData에서 해당 id의 데이터 찾기
    const diaryData = mockData.diaries.find(diary => diary.id === parseInt(id)) || {
        id: 0,
        keyword: "",
        createdAt: "",
        content: "",
        image_data: Drawing,
        views: 0,
        likes: 0
    };

    const handleLike = () => {
        setLike(!like);
    };

    return (
        <Container>
            <Content>
                <Header>
                    <CategoryAndDate>
                        <CategoryLabel>
                            <img 
                                src={categoryImages[diaryData.keyword]} 
                                alt="category" 
                                width="32" 
                                height="32" 
                            />
                            {diaryData.keyword}
                        </CategoryLabel>
                    </CategoryAndDate>
                    <AuthorSection>
                        <Author>하루님의 로그</Author>
                        <Date>{diaryData.createdAt}</Date>
                    </AuthorSection>
                </Header>
    
                <DrawingBox>
                    {diaryData.image_data && (
                        <DrawingImage src={diaryData.image_data} alt="diary drawing" />
                    )}
                </DrawingBox>
    
                <TextBox>
                    <TextContent>
                        {diaryData.content}
                    </TextContent>
                </TextBox>
    
                <ActionBar>
                    <LikeCount>추천 {diaryData.likes}</LikeCount>
                    <ButtonContainer>
                        <StyledUpButtonWrapper>
                            <UpButton 
                                isLiked={like} 
                                onLike={handleLike}
                            >
                                추천
                            </UpButton>
                        </StyledUpButtonWrapper>
                        <WriteButton>
                            내일 뭐하지? ✨
                        </WriteButton>
                    </ButtonContainer>
                </ActionBar>
            </Content>
        </Container>
    );
};

export default DailyDetailPage;

// Styled Components
const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    background: #FEFFFB;
    min-height: 100vh;
    padding: 24px;
`;

const Content = styled.div`
    width: 880px;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
`;

const DrawingBox = styled.div`
    width: 880px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
    min-height: 154px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    button {
        position: absolute;
        bottom: 12px;
        right: 12px;
        width: 32px;
        height: 32px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
    }
`;

const TextBox = styled.div`
    width: 880px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    position: relative;
    button {
        position: absolute;
        bottom: 12px;
        right: 12px; 
        width: 32px;
        height: 32px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
    }
`;

const AuthorSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
`;

const CategoryAndDate = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const CategoryLabel = styled.div`
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 4px;
    background: #FBFFEE;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    height: 32px;
    
    img {
        width: 32px;
        height: 32px;
    }
`;

const Author = styled.div`
    font-size: 14px;
    color: #333;
`;

const Date = styled.div`
    color: #666;
    font-size: 14px;
`;

const DrawingImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const TextContent = styled.div`
    font-family: "UhBee Seulvely", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    min-height: 200px;
    white-space: pre-wrap;
    padding: 24px;
`;

const ActionBar = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #EEE;
    min-height: 704px;
`;

const LikeCount = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`;

const WriteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 201px;
    height: 40px;
    border-radius: 4px;
    background: white;
    border: 1px solid #DDD;
    cursor: pointer;
    font-family: Pretendard;
    font-size: 14px;
    gap: 8px;

    &:hover {
        background: #EADDFF;
    }
`;

const StyledUpButtonWrapper = styled.div`
    button {
        width: 201px !important;
        height: 40px !important;
        flex: none !important;
    }
`;