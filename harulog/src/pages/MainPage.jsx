import React, { useState, useEffect } from "react";

//import style
import styled from "styled-components";
import { getJongseong } from "../utils/Jongseong";
//import react-router-dom
import { useNavigate } from "react-router-dom";

//import components
import UpButton from "../components/UpButton";
import { useDiaryContext } from "../components/DiaryContext";
//import assets
import WriteButtonImage from "../assets/icon_writebutton.svg";
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Relax from "../assets/icon_relax.svg";
import Achievement from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotion from "../assets/icon_emotions.svg";
import Smile from "../assets/icon_smile.svg";

const MainPage = () => {
  const navigate = useNavigate();
  const { selectedCategoryId,
    setSelectedCategoryId,
    searchContent,
    setSearchContent,
    isScrolled,
    handleCategoryClick,
    handleScroll,
    filteredDiaries,
    scrollToCategorySection,
    diariesData   
  } = useDiaryContext();
  const [like, setLike] = useState(() => {
    const savedLikes = localStorage.getItem('diaryLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  // 카테고리 데이터 추가
  const [categories] = useState([
    { id: 1, categoryName: "소통", image: Communication },
    { id: 2, categoryName: "감사", image: Thanks },
    { id: 3, categoryName: "휴식", image: Relax },
    { id: 4, categoryName: "성취", image: Achievement },
    { id: 5, categoryName: "도전", image: Challenge },
    { id: 6, categoryName: "감정", image: Emotion },
  ]);

  useEffect(() => {
    localStorage.setItem('diaryLikes', JSON.stringify(like));
  }, [like]);

  const handleLike = (diaryId) => {
    setLike(prev => ({
      ...prev,
      [diaryId]: !prev[diaryId]
    }));
  };

  return (
    <Container>
      <Body>
        <BannerContainer>
          <Comment>
            당신의 하루는
            <br />
            어떠셨나요?
          </Comment>
          <LogoLink
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/dailylog");
            }}
          >
            <p>로그 작성하러 가기</p>
            <Logo src={WriteButtonImage} alt="logo" />
          </LogoLink>
        </BannerContainer>
        <CategoryContainer id="category-section">
          {categories.map((category) => (
            <Category
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(category.id);
                scrollToCategorySection();
              }}
              $isSelected={selectedCategoryId === category.id}
            >
              <CategoryImage src={category.image} alt={category.categoryName} />
              <div>{category.categoryName}</div>
            </Category>
          ))}
        </CategoryContainer>
        <DiaryContainer>
          {diariesData.map((diary) => (
            <DiaryCard key={diary.id}>
              <div
                onClick={() => {
                  navigate(`/diary/${diary.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                {diary.image_data && diary.image_data !== "null" && (
                  <DiaryImage src={diary.image_data} alt="diary" />
                )}
                <DiaryHeader>
                  <DiaryKeywordLabel>{diary.category_id}</DiaryKeywordLabel>
                  <DiaryDate>{diary.created_at.slice(0, 10)}</DiaryDate>
                </DiaryHeader>
                <DiaryContent
                  $hasImage={!!diary.image_data && diary.image_data !== "null"}
                  $needsEllipsis={
                    diary.content.split("\n").length > 3 ||
                    diary.content.length > 100
                  }
                >
                  <p>{diary.content}</p>
                </DiaryContent>
              </div>
              <DiaryActions>
                <UpButton
                  diaryId={diary.id}
                  isLiked={like[diary.id]}
                  onLike={handleLike}
                >
                  <img src={Smile} alt="smile" />
                  추천 {diary.likes}
                </UpButton>
                <WriteButton
                  onClick={() => {
                    window.scrollTo(0, 0);
                    const categoryName = categories.find(cat => cat.id === diary.category_id)?.categoryName || '';
                    navigate(`/DailyLog?category_id=${diary.category_id}`);
                  }}
                >
                  {`"${categories.find(cat => cat.id === diary.category_id)?.categoryName || ''}"${
                    getJongseong(categories.find(cat => cat.id === diary.category_id)?.categoryName || '', "으로")
                  }`} 작성하기
                </WriteButton>
              </DiaryActions>
            </DiaryCard>
          ))}
        </DiaryContainer>
      </Body>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefffb;
  font-family: Pretendard;
`;

const LogoLink = styled.div`
  display: flex;
  width: 145px;
  height: 24px;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ffffff;

  p {
    font-size: 14px;
    margin-right: 4px;
  }
`;

const Logo = styled.img`
  width: 19px;
  height: 19px;
`;

const Body = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
`;

const Comment = styled.h1`
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 56px;
  margin: 0;
`;

const BannerContainer = styled.div`
  width: 880px;
  height: 146px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 0px 40px 0px;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  margin: 20px 0;
`;

const CategoryImage = styled.img`
  width: 48px;
  height: 48px;
`;

const Category = styled.button.attrs((props) => ({
  isSelected: undefined,
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 104px;
  gap: 12px;
  border: none;
  background-color: ${(props) =>
    props.isSelected ? "#f0f0f0" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
  padding: 20px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
// Styled Components
const DiaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열 그리드
  gap: 20px;
  width: 100%;
  margin-top: 30px;
  padding: 0px;
`;

const DiaryCard = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DiaryImage = styled.img`
  width: 240px;
  height: 60px;
  padding: 10px 20px;
  object-fit: cover;
`;

const DiaryHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  z-index: 1;
`;

const DiaryKeywordLabel = styled.span`
  background-color: #fbffee;
  width: 49px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
`;

const DiaryDate = styled.span`
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiaryContent = styled.div`
  flex: 1;
  display: flex;
  align-items: ${(props) => (props.$hasImage ? "flex-start" : "center")};
  padding-top: ${(props) => (props.$hasImage ? "0px" : "50px")};

  p {
    font-family: "UhBee Seulvely", sans-serif;
    font-size: 14px;
    margin: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;

    -webkit-line-clamp: ${(props) => (props.$hasImage ? 3 : 5)};
    max-height: ${(props) => (props.$hasImage ? "4.5em" : "7.5em")};
    line-height: 1.5em;

    &::after {
      content: ${(props) =>
        props.$hasImage && props.$needsEllipsis ? '"..."' : "none"};
    }
  }
`;

const DiaryActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
`;

const WriteButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 32px;
  gap: 12px;
  padding: 8px 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  font-family: Pretendard;
  background: ${(props) => (props.$isLiked ? "#eaddff" : "white")};
  color: ${(props) => (props.$isLiked ? "#FFFFFF" : "inherit")};
  &:hover {
    background: #eaddff;
  }
`;
