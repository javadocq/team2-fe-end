import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../components/BASE_URL";

//import style
import styled from "styled-components";
import { getJongseong } from "../utils/Jongseong";
//import react-router-dom
import { useNavigate } from "react-router-dom";

//import components
import UpButton from "../components/UpButton";
import { useDiaryContext } from "../components/DiaryContext";
import SortButton from "../components/SortButton";
//import assets
import WriteButtonImage from "../assets/icon_writebutton.svg";
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Relax from "../assets/icon_relax.svg";
import Achievement from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotion from "../assets/icon_emotions.svg";


const MainPage = () => {
  const navigate = useNavigate();
  const { sortType, setSortType } = useDiaryContext();
  const { searchContent, selectedCategoryId, setSelectedCategoryId, scrollToCategorySection } = useDiaryContext();
  const [like, setLike] = useState(() => {
    const savedLikes = localStorage.getItem('diaryLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const { data: diariesData = [] } = useQuery({
    queryKey: ['diaries', sortType],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/diaries`, {
        params: {
          orderBy: sortType,
          limit: 100  
        }
      });
      return response.data;
    }
  });

  const filteredDiaries = diariesData.filter(diary => {
    const matchesCategory = selectedCategoryId === 0 || diary.category_id === selectedCategoryId;
    const matchesSearch = searchContent === "" || 
      diary.content.toLowerCase().includes(searchContent.toLowerCase()) ||
      diary.username.toLowerCase().includes(searchContent.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // const scrollToCategorySection = () => {
  //   const categorySection = document.getElementById("category-section");
  //   if (categorySection) {
  //     const offset = categorySection.offsetTop + 50;
  //     window.scrollTo({
  //       top: offset,
  //       behavior: "smooth",
  //     });
  //   }
  // };

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
              navigate("/dailylog", {
                state: {
                  selectedCategoryId: 1,
                }
              });
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
                scrollToCategorySection();
                setSelectedCategoryId(category.id);
              }}
              $isSelected={selectedCategoryId === category.id}
            >
              <CategoryImage src={category.image} alt={category.categoryName} />
              <div>{category.categoryName}</div>
            </Category>
          ))}
        </CategoryContainer>
        <SortContainer>
          <SortButton onSortChange={setSortType} />
        </SortContainer>
        <DiaryContainer>
          {filteredDiaries.map((diary) => (
            <DiaryCard key={diary.id}>
              <div
                onClick={() => {
                  navigate(`/diary/${diary.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                {diary.image_data ? 
                  <DiaryImage src={diary.image_data} alt="diary" /> : null
                }
                <DiaryHeader>
                  <DiaryKeywordLabel>{`${categories.find(cat => cat.id === diary.category_id)?.categoryName || ''}`}</DiaryKeywordLabel>
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
                  onLike={handleLike}
                >
                  추천
                </UpButton>
                <WriteButton
                  onClick={() => {
                    window.scrollTo(0, 0);
                    const category = categories.find(cat => cat.id === diary.category_id);
                    if (category) {
                      navigate(`/DailyLog`, {
                        state: { 
                          selectedCategoryId: diary.category_id,
                          categoryName: category.categoryName
                        }
                      });
                    }
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
  padding-bottom : 20px;
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
  isSelected: props.$isSelected,
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 104px;
  gap: 12px;
  border: none;
  background-color: ${(props) =>
    props.isSelected ? "#f5f5f5" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
  padding: 20px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;

const DiaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열 그리드
  gap: 20px;
  width: 100%;
  margin-top: 30px;
  padding: 0px;
`;

const DiaryCard = styled.div`
  width: 280px;
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
  height: 90px;
  padding: 0px 20px;
  margin: 10px 10px 0px 10px;
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
  color: #666;
  background-color: #fbffee;
  width: 49px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 
             0 4px 8px rgba(0, 0, 0, 0.05);
`;

const DiaryDate = styled.span`
  color: #666;
  background-color: #fbffee;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 
             0 4px 8px rgba(0, 0, 0, 0.05);
`;

const DiaryContent = styled.div`
  flex: 1;
  width: 277px;
  display: flex;
  align-items: ${(props) => (props.$hasImage ? "flex-start" : "center")};
  padding-top: ${(props) => (props.$hasImage ? "0px" : "50px")};

  p {
    font-family: "UhBee Seulvely", sans-serif;
    font-size: 14px;
    margin: 10px 10px 0px 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;

    -webkit-line-clamp: ${(props) => (props.$hasImage ? 3 : 5)};
    max-height: ${(props) => (props.$hasImage ? "3.0em" : "7.5em")};
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
