import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
//import assets
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Relax from "../assets/icon_relax.svg";
import Achievement from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotion from "../assets/icon_emotions.svg";
import Pencil from "../assets/icon_pencil.svg";
import Beverage from "../assets/icon_beverage.svg";
import Music from "../assets/icon_music.svg";
import Food from "../assets/icon_food.svg";
import Video from "../assets/icon_video.svg";
import { BASE_URL } from "../components/BASE_URL";
import Smile from "../assets/icon_smile.svg";
import ShowEye from "../assets/icon_showPW.svg";
import hideEye from "../assets/icon_hidePW.svg";
const activityImages = [Beverage, Music, Food, Video];

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
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [userName, setUserName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showTextModal, setShowTextModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [apiText, setApiText] = useState('');
    const [diaryData, setDiaryData] = useState([]);
    const [date, setDate] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recommend, setRecommend] = useState([]);
    const [views, setViews] = useState(0);
    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/diaries/${id}`); 
                setDiaryData(response.data);
                setDate(response.data.created_at);
                setUserName(response.data.username);
                setViews(response.data.views);
                setLikes(response.data.likes);
            } catch (error) {
                console.error("Error fetching diary:", error);
            }
        };
        fetchDiary();
    }, [id]);

    useEffect(() => {
        if (apiText) {
        }
    }, [apiText]);

    const handleLike = async () => {
        try {
            await axios.patch(`${BASE_URL}/diaries/${id}/likes`);
            setIsLiked(true);
            setLikes((prev) => prev + 1);
        } catch (error) {
            console.error("Error liking diary:", error);
        }
    };

    const handleWriteAPI = () => {
        setShowTextModal(true);
        const fetchWriteAPI = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`${BASE_URL}/diaries/adaptation`, {
                    id : id,
                }); 
                setApiText(response.data.adapted_content);
            } catch (error) {
                alert("연결이 실패하였습니다.");
            } finally {
                setLoading(false); 
            }
        };
        fetchWriteAPI();
    }

    function handleRecommend() {
        setShowModal(true)
        const fetchRecommend = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`${BASE_URL}/diaries/recommendation`, {
                    id : id,
                }); 
                setRecommend(response.data);
            } catch (error) {
                alert("연결이 실패하였습니다.");
            } finally {
                setLoading(false); 
            }
        };
        fetchRecommend();
    }

    const handleDelete = () => {
        const fetchDelete = async () => {
            try {
                const response = await axios.delete(`${BASE_URL}/diaries/${id}`, {data: {
                    password: password,
                }});
                navigate('/');
            } catch(error) {
                alert("비밀번호가 맞지 않습니다.")
            }
        }
        fetchDelete();
    }

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    function handlePasswordChange(e) {
        const value = e.target.value;
        setPassword(value);
    }
    

    return (
        <Container>
            <Content>
                <Header>
                    <CategoryAndDate>
                        <CategoryLabel>
                            <img 
                                src={categoryImages[diaryData.category]} 
                                alt="category" 
                                width="32" 
                                height="32" 
                            />
                            {diaryData.category}
                        </CategoryLabel>
                    </CategoryAndDate>
                    <AuthorSection>
                        <Author>{userName}님의 로그</Author>
                        <Date>{date.slice(0,10)}</Date>
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
                    <EditButton onClick={() => handleWriteAPI()}>
                        <img src={Pencil} alt="edit" width="32" height="32" />
                    </EditButton>
                </TextBox>
    
                <ActionBar>
                    <LikeAndViews>
                        <LikeCount>추천 {likes}</LikeCount>
                        <ViewsCount>조회 {views}</ViewsCount>
                    </LikeAndViews>
                    <ButtonContainer>
                        <StyledUpButtonWrapper>
                            <UpButton onClick={handleLike}>
                                <UpButtonImg
                                    src={Smile} 
                                    alt="smile"
                                />
                                추천
                            </UpButton>
                        </StyledUpButtonWrapper>
                        <WriteButton onClick={() => handleRecommend()}>
                            내일 뭐하지? ✨
                        </WriteButton>
                        <DeleteButton onClick={() => setShowDeleteModal(true)}>
                            글 삭제하기
                        </DeleteButton>
                    </ButtonContainer>
                </ActionBar>
            </Content>

            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
                        <ModalTitle>오늘 하루도 고생 많았어요</ModalTitle>
                        <ModalContentBox>
                            {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <ModalImage src={activityImages[recommend.recommended_category_id-1]} alt="activity suggestion" />
                                    <ModalText>{recommend.recommended_content}</ModalText>
                                </>
                            )}
                        </ModalContentBox>
                    </Modal>
                </ModalOverlay>
            )}

            {showTextModal && (
                <ModalOverlay onClick={() => setShowTextModal(false)}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setShowTextModal(false)}>×</CloseButton>
                        <ModalTitle>오늘 하루도 고생 많았어요</ModalTitle>
                        <ModalTextBox>
                            {loading ? <LoadingSpinner /> : apiText}
                        </ModalTextBox>
                        <ModalText>AI가 재해석한 하루님의 하루 어떠신가요?</ModalText>
                    </Modal>
                </ModalOverlay>
            )}

            {showDeleteModal && (
                <ModalOverlay onClick={() => setShowDeleteModal(false)}>
                    <Modal onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setShowDeleteModal(false)}>×</CloseButton>
                        <ModalTitle>글을 삭제하시겠습니까?</ModalTitle>
                        <Text>비밀번호</Text>
                        <Input 
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => handlePasswordChange(e)}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <Eye onClick={handleShowPassword}>{showPassword ? <img src={ShowEye} /> : <img src={hideEye} />}</Eye>
                        <ButtonBox>
                            <LeftButton onClick={() => setShowDeleteModal(false)}>취소</LeftButton>
                            <RightButton onClick={() => handleDelete()}>삭제</RightButton>
                        </ButtonBox>
                    </Modal>
                </ModalOverlay>
            )}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    background: #FEFFFB;
    padding: 24px;
    height: 100%;
`;

const Content = styled.div`
    width: 880px;
    flex-direction: column;
    margin-top: 8px;
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
`;

const TextBox = styled.div`
    width: 880px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
    position: relative;
`;

const EditButton = styled.button`
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    
    img {
        width: 100%;
        height: 100%;
    }
    
    &:hover {
        opacity: 0.8;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    position: relative;
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

const UpButton = styled.button`
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

const UpButtonImg = styled.img`
    
`;
const TextContent = styled.div`
    font-family: "UhBee Seulvely", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    height: 180px;
    white-space: pre-wrap;
    padding: 20px;
`;

const ActionBar = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid #EEE;
    height: 80px;
`;

const LikeAndViews = styled.div`
    display: flex;
    gap: 16px;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const LikeCount = styled.div`
    font-size: 14px;
    color: #666;
    margin-left: 300px;
    font-size: 20px;
    color: #65558f;
`;

const ViewsCount = styled.div`
    font-size: 14px;
    color: #666;
    margin-right: 300px;
    font-size: 20px;
    color: #65558f;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
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

const DeleteButton = styled.button`
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
        border-radius: 4px !important;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Modal = styled.div`
    background: white;
    padding: 32px;
    border-radius: 12px;
    position: relative;
    width: 880px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
`;

const ModalTitle = styled.h2`
    font-size: 24px;
    color: #333;
    margin: 0;
`;


const ModalImage = styled.img`
    width: 336px;
    height: 240px;
    object-fit: contain;
`;

const ModalText = styled.p`
    font-size: 16px;
    color: #333;
    margin: 0;
    text-align: center;
`;

const Text = styled.p`
    color: var(--b100, #333);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    width : 730px;
    font-weight: 500;
    line-height: normal;
`;

const Input = styled.input`
    display: flex;
    width : 730px;
    height: 40px;
    padding: 10px 14px;
    align-items: center;
    margin-top : -10px;
    margin-bottom : 40px;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid var(--b20, #EEE);
    background: var(--b0, #FFF);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
`;

const Eye = styled.div`
    position : absolute;
    right : 120px;
    bottom : 158px;
`;

const ButtonBox = styled.div`
    display : flex;
    gap : 24px;
`;

const LeftButton = styled.button`
    display: flex;
    width: 353px;
    height: 48px;
    padding: 15px 0px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid var(--Schemes-Primary, #65558F);
    cursor : pointer;
    background: var(--b0, #FFF);
    color: var(--Schemes-Primary, #65558F);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const RightButton = styled.button`
    display: flex;
    width: 353px;
    height: 48px;
    padding: 15px 0px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor : pointer;
    border-radius: 8px;
    background: var(--Schemes-Primary, #65558F);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
    border : none;
    color: var(--b0, #FFF);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const ModalTextBox = styled.div`
    width: 578px;
    height: 253px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    padding: 16px;
    font-family: "UhBee Seulvely", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    white-space: pre-wrap;
    overflow-y: auto;
    position: relative;
`;

const ModalContentBox = styled.div`
    width: 578px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    position: relative;
    min-height: 350px;
`;

export default DailyDetailPage;