import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/LogoImage.png";
import WriteButtonImage from "../assets/WriteButtonImage.png";
import CardBGImage from "../assets/CardBGImage.png";
import CommunicationImage from "../assets/keywordsImage/CommunicationImage.png";
import ThanksImage from "../assets/keywordsImage/ThanksImage.png";
import RelaxImage from "../assets/keywordsImage/RelaxImage.png";
import AchievementImage from "../assets/keywordsImage/AchievementImage.png";
import ChallengeImage from "../assets/keywordsImage/ChallengeImage.png";
import EmotionImage from "../assets/keywordsImage/EmotionImage.png";
import SmileImage from "../assets/SmileImage.png";
import mockData from "../mocks/mockData.json";
import { useQuery } from "@tanstack/react-query";

const MainPage = () => {
  const navigate = useNavigate();

  const [selectedKeyword, setSelectedKeyword] = useState(null);
  
  // 키워드 배열
  const keywords = [
    { id: 1, keyword : "communication", keywordName: "소통", image: CommunicationImage },
    { id: 2, keyword : "thanks", keywordName: "감사", image: ThanksImage },
    { id: 3, keyword : "relax", keywordName: "휴식", image: RelaxImage },
    { id: 4, keyword : "achievement", keywordName: "성취", image: AchievementImage },
    { id: 5, keyword : "challenge", keywordName: "도전", image: ChallengeImage },
    { id: 6, keyword : "emotion", keywordName: "감정", image: EmotionImage },
  ];
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
  const filteredDiaries = selectedKeyword
    ? diaries.filter((diary) => diary.keyword === selectedKeyword)
    : diaries;

  return (
    <Container>
      <Header>
        <LogoLink onClick={() => navigate("/")}>
          <Logo src={LogoImage} alt="logo" />
          <Title style={{ marginLeft: "8px" }}>하루로그</Title>
        </LogoLink>
        <Nickname>guest</Nickname>
      </Header>
      <Body>
        <CommentContainer>
          <Comment>
            당신의 하루는
            <br />
            어떠셨나요?
          </Comment>
          <LogoLink onClick={() => navigate("/write")}>
            <p style={{ fontSize: "28px", marginRight: "10px" }}>
              로그 작성하러 가기
            </p>
            <Logo
              style={{ marginBottom: "0px" }}
              src={WriteButtonImage}
              alt="logo"
            />
          </LogoLink>
        </CommentContainer>
        {/* {diaries.map((diary) => (
        <div key={diary.id}>{diary.title}</div>
      ))} */}
        <KeyWordContainer>
          {keywords.map((keyword) => (
            <KeyWord
              key={keyword.id}
              onClick={() => setSelectedKeyword(keyword.keywordName)}
              isSelected={selectedKeyword === keyword.keywordName}
            >
              <KeyWordImage src={keyword.image} alt={keyword.keywordName} />
              <p
                style={{
                  fontSize: "28px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#666666",
                }}
              >
                {keyword.keywordName}
              </p>
            </KeyWord>
          ))}
        </KeyWordContainer>
        <DiaryContainer>
          {filteredDiaries.map((diary) => (
            <DiaryCard key={diary.id}>
              <div onClick={() => navigate(`/diary/${diary.id}`)}>
                <DiaryImage src={diary.image_data} alt={diary.title} />
                <DiaryHeader>
                  <DiaryKeywordLabel>{diary.keyword}</DiaryKeywordLabel>
                  <DiaryDate>{diary.createdAt}</DiaryDate>
                </DiaryHeader>
                <DiaryContent>
                  <p>{diary.content}</p>
                </DiaryContent>
              </div>
              <DiaryActions>
                {/* 추천 버튼은 따로 컴포넌트로 만들어 놓고 재사용 할 수 있도록 할 예정 */}
                <ActionButton>
                  <img src={SmileImage} alt="smile" />
                  추천
                </ActionButton>
                <ActionButton>'{diary.keyword}'으로 작성하기</ActionButton>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid #eaddff;
`;

const Title = styled.h1`
  font-family: "UhBee Seulvely", sans-serif;
  font-size: 36px;
`;

const Nickname = styled.p`
  font-size: 24px;
  margin-right: 100px;
`;

const LogoLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-left: 100px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 30px;
`;

const Body = styled.div`
  width: 70%;
`;

const Comment = styled.h1`
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 112px;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KeyWordContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const KeyWordImage = styled.img`
  width: 100px;
  height: 100px;
`;

const KeyWord = styled.button`
  border: none;
  background-color: ${(props) =>
    props.isSelected ? "#f0f0f0" : "transparent"};
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #ddd;
  padding: 20px 80px;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
// Styled Components
const DiaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const DiaryCard = styled.div`
  flex: 0 0 calc(33.333% - 14px);
  position: relative;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
`;

const DiaryImage = styled.img`
  width: 100%;
  height: 200px;
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
  width: 100px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 24px;
`;

const DiaryDate = styled.span`
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiaryContent = styled.div`
  padding: 16px;

  p {
    font-family: "UhBee Seulvely", sans-serif;
    font-size: 28px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    margin: 0;
    color: #444;
    height: ${28 * 1.5 * 5}px;
  }
`;

const DiaryActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 65px;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background: #f5f5f5;
  }
`;
