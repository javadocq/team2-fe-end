import React, { useState, useEffect } from "react";

//import style
import styled from "styled-components";

//import react-router-dom
import { useNavigate } from "react-router-dom";

//import components
import UpButton from "../components/UpButton";

//import assets
import WriteButtonImage from "../assets/icon_writebutton.svg";
import CardBGImage from "../assets/CardBGImage.png";
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Relax from "../assets/icon_relax.svg";
import Achievement from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotion from "../assets/icon_emotions.svg";
import Smile from "../assets/icon_smile.svg";
import mockData from "../mocks/mockData.json";
import Check from "../assets/icon_check.svg";

//import react-query
import { useQuery } from "@tanstack/react-query";

const MainPage = () => {
  const navigate = useNavigate();
  const [isKeywordFixed, setIsKeywordFixed] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  const [likedDiaries, setLikedDiaries] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const keywordSection = document.getElementById("keyword-section");
      if (keywordSection) {
        const keywordPosition = keywordSection.offsetTop;
        const scrollPosition = window.scrollY + 80; // 헤더 높이만큼 더해줌
        setIsKeywordFixed(scrollPosition > keywordPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 키워드 배열
  const [keywords, setKeywords] = useState([
    {
      id: 1,
      keywordName: "소통",
      image: Communication,
    },
    { id: 2, keywordName: "감사", image: Thanks },
    { id: 3, keywordName: "휴식", image: Relax },
    {
      id: 4,
      keywordName: "성취",
      image: Achievement,
    },
    { id: 5, keywordName: "도전", image: Challenge },
    { id: 6, keywordName: "감정", image: Emotion },
  ]);
  // 전체 다이어리 조회 (mockData 호출)
  const { data: diaries = [] } = useQuery({
    queryKey: ["diaries"],
    queryFn: () => {
      return mockData.diaries.map((diary) => ({
        ...diary,
        image_data: CardBGImage,
      }));
    },
  });

  // 선택된 키워드에 따른 일기 필터링
  const filteredDiaries = diaries
    .filter((diary) => !selectedKeyword || diary.keyword === selectedKeyword)
    .filter(
      (diary) =>
        diary.content &&
        diary.content.toLowerCase().includes(searchContent.toLowerCase())
    );

  const scrollToKeywordSection = () => {
    const keywordSection = document.getElementById("keyword-section");
    if (keywordSection) {
      const offset = keywordSection.offsetTop + 50; // 헤더 높이만큼 여유 공간
      window.scrollTo({
        top: offset,
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }
  };

  const handleLike = (diaryId) => {
    setLikedDiaries((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(diaryId)) {
        newLiked.delete(diaryId);
      } else {
        newLiked.add(diaryId);
      }
      return newLiked;
    });
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
          <LogoLink onClick={() => navigate("/dailylog")}>
            <p>로그 작성하러 가기</p>
            <Logo src={WriteButtonImage} alt="logo" />
          </LogoLink>
        </BannerContainer>
        {/* {diaries.map((diary) => (
        <div key={diary.id}>{diary.title}</div>
      ))} */}
        <KeyWordContainer id="keyword-section">
          {keywords.map((keyword) => (
            <KeyWord
              key={keyword.id}
              onClick={() => {
                setSelectedKeyword(keyword.keywordName);
                scrollToKeywordSection();
              }}
              $isSelected={selectedKeyword === keyword.keywordName}
            >
              <KeyWordImage src={keyword.image} alt={keyword.keywordName} />
              <div>{keyword.keywordName}</div>
            </KeyWord>
          ))}
        </KeyWordContainer>
        <DiaryContainer>
          {filteredDiaries.map((diary) => (
            <DiaryCard key={diary.id}>
              <div onClick={() => navigate(`/diary/${diary.id}`)}>
                {diary.image_data && (
                  <DiaryImage src={diary.image_data} alt={diary.keyword} />
                )}
                <DiaryHeader>
                  <DiaryKeywordLabel>{diary.keyword}</DiaryKeywordLabel>
                  <DiaryDate>{diary.createdAt}</DiaryDate>
                </DiaryHeader>
                <DiaryContent $hasImage={!!diary.image_data}>
                  <p>{diary.content}</p>
                </DiaryContent>
              </div>
              <DiaryActions>
                {/* 추천 버튼은 따로 컴포넌트로 만들어 놓고 재사용 할 수 있도록 할 예정 */}
                <UpButton
                  diaryId={diary.id}
                  isLiked={likedDiaries.has(diary.id)}
                  onLike={handleLike}
                >
                  추천
                </UpButton>
                <WriteButton
                  onClick={() => navigate(`/DailyLog?keyword=${diary.keyword}`)}
                >
                  '{diary.keyword}'으로 작성하기
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

const KeyWordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  margin: 20px 0;
`;

const KeyWordImage = styled.img`
  width: 48px;
  height: 48px;
`;

const KeyWord = styled.button.attrs((props) => ({
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
  width: 100%; // 너비를 100%로 설정
  height: 220px;
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DiaryImage = styled.img`
  width: 100%;
  height: 100px;
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
  margin: 8px 12px;

  p {
    font-family: "UhBee Seulvely", sans-serif;
    display: -webkit-box;
    height: 50px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    margin: 0;
    color: #444;
    -webkit-line-clamp: ${(props) => (props.$hasImage ? 3 : 5)};
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
