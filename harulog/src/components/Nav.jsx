import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImage from "../assets/icon_logo.svg";
import SearchIconImage from "../assets/icon_search.svg";
import CommunicationImage from "../assets/icon_communication.svg";
import ThanksImage from "../assets/icon_thanks.svg";
import RelaxImage from "../assets/icon_relax.svg";
import AchievementImage from "../assets/icon_achievement.svg";
import ChallengeImage from "../assets/icon_challenge.svg";
import EmotionImage from "../assets/icon_emotion.svg";
import ViewBestLog from "./ViewBestLog";
const NavBar = ({
  selectedKeyword,
  setSelectedKeyword,
  searchContent,
  setSearchContent,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 스크롤 상태에 따른 Nav 구성
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 메인 페이지(`/`)에서만 스크롤 이벤트 적용
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(false); // 다른 페이지에서는 기본 상태로 고정
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, selectedKeyword]);

  const keywords = [
    {
      id: 1,
      keyword: "communication",
      keywordName: "소통",
      image: CommunicationImage,
    },
    { id: 2, keyword: "thanks", keywordName: "감사", image: ThanksImage },
    { id: 3, keyword: "relax", keywordName: "휴식", image: RelaxImage },
    {
      id: 4,
      keyword: "achievement",
      keywordName: "성취",
      image: AchievementImage,
    },
    {
      id: 5,
      keyword: "challenge",
      keywordName: "도전",
      image: ChallengeImage,
    },
    { id: 6, keyword: "emotion", keywordName: "감정", image: EmotionImage },
  ];

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      {isScrolled ? (
        // 스크롤 상태의 Nav
        <>
          <Nav>
            <Logo onClick={() => navigate("/")}>
              <LogoImg src={LogoImage} alt="logo" />
              <Title style={{ marginLeft: "8px" }}>하루로그</Title>
            </Logo>
            <KeywordContainer>
              {keywords.map((keyword) => (
                <KeyWord
                  key={keyword.id}
                  onClick={() => setSelectedKeyword(keyword.keywordName)}
                  isSelected={selectedKeyword === keyword.keywordName}
                >
                  <KeyWordImage src={keyword.image} alt={keyword.keywordName} />
                  <KeywordText>{keyword.keywordName}</KeywordText>
                </KeyWord>
              ))}
            </KeywordContainer>
            <SearchBar>
              <SearchInput
                type="text"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
              />
              <SearchIcon src={SearchIconImage} alt="search" />
            </SearchBar>
            <br />
          </Nav>
        </>
      ) : (
        // 기본 Nav 구성
        <Nav>
          <Logo onClick={() => navigate("/")}>
            <LogoImg src={LogoImage} alt="logo" />
            <Title style={{ marginLeft: "8px" }}>하루로그</Title>
          </Logo>
          <SearchBar>
            <SearchInput
              type="text"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
            <SearchIcon src={SearchIconImage} alt="search" />
          </SearchBar>
        </Nav>
      )}
    </nav>
  );
};

export default NavBar;

const Nav = styled.div`
  position: fixed; // 고정 위치
  top: 0; // 최상단에 위치
  left: 0; // 왼쪽 끝에 위치
  right: 0; // 오른쪽 끝까지 확장
  z-index: 1000; // 다른 요소들 위에 표시
  background: white; // 배경색 지정
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaddff;
`;

const Title = styled.h1`
  font-family: "UhBee Seulvely", sans-serif;
  font-size: 36px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  margin-right: 50px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 0px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #6750a4;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-left: 100px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 30px;
`;

const KeywordContainer = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  margin-left: 100px;
  justify-content: center;
  gap: 20px;
`;

const KeyWord = styled.button.attrs(props => ({
  isSelected: undefined, // DOM에 전달되지 않도록 설정
}))`
  display: flex;
  align-items: center;
  gap: 20px;
  border: none;
  background-color: ${(props) => props.isSelected ? "#f0f0f0" : "transparent"};
  border-bottom: ${(props) => props.isSelected ? "1px solid #65558f" : "none"};
  cursor: pointer;
  transition: all 0.2s;
  padding: 20px 70px;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const KeyWordImage = styled.img`
  width: 50px;
  height: 50px;
`;

const KeywordText = styled.p`
  font-size: 30px;
  margin: 0;
  color: #666666;
  font-weight: 500;
`;
