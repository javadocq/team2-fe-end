import React, { useState, useEffect } from "react";
//import style
import styled from "styled-components";
//import components
import ViewBestLog from "./ViewBestLog";

//import react-router-dom
import { useNavigate, useLocation } from "react-router-dom";

//import assets
import LogoImage from "../assets/icon_logo.svg";
import Search from "../assets/icon_search.svg";
import Communication from "../assets/icon_communication.svg";
import Thanks from "../assets/icon_thanks.svg";
import Relax from "../assets/icon_relax.svg";
import Achievement from "../assets/icon_achievements.svg";
import Challenge from "../assets/icon_challenge.svg";
import Emotion from "../assets/icon_emotions.svg";

const NavBar = ({
  selectedKeyword,
  setSelectedKeyword,
  searchContent,
  setSearchContent,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // 현재 페이지 경로
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  // 스크롤 상태에 따른 Nav 구성
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 330) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // 메인 페이지에서만 스크롤 이벤트 적용
    if (isMainPage) {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(false);
    }
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMainPage]);

  // 카테고리 목록
  const [category, setCategory] = useState([
    {
      id: 1,
      categoryName: "소통",
      image: Communication,
    },
    {
      id: 2,
      categoryName: "감사",
      image: Thanks,
    },
    {
      id: 3,
      categoryName: "휴식",
      image: Relax,
    },
    {
      id: 4,
      categoryName: "성취",
      image: Achievement,
    },
    {
      id: 5,
      categoryName: "도전",
      image: Challenge,
    },
    {
      id: 6,
      categoryName: "감정",
      image: Emotion,
    },
  ]);

  // 스크롤 상태일 때 카테고리를 누를 경우 데이터 가져올 수 있어야함.
  function handleCategorySelect(categoryName) {
    setSelectedCategory(categoryName);
  }

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      {isMainPage && isScrolled ? (
        <>
          <Nav>
            <Logo onClick={() => navigate("/")}>
              <LogoImg src={LogoImage} alt="logo" />
              <Title style={{ marginLeft: "8px" }}>하루로그</Title>
            </Logo>
            <KeywordContainer>
              {category.map((category) => (
                <Category
                  key={category.id}
                  onClick={() => {
                    setCategory(category.categoryName);
                  }}
                  $isSelected={selectedCategory === category.categoryName}
                >
                  <CategoryImage
                    src={category.image}
                    alt={category.categoryName}
                  />
                  <CategoryText>{category.categoryName}</CategoryText>
                </Category>
              ))}
            </KeywordContainer>
            <SearchBar>
              <SearchInput
                type="text"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
              />
              <SearchIcon src={Search} alt="search" />
            </SearchBar>
          </Nav>
        </>
      ) : (
        // 기본 Nav (메인 페이지 스크롤 전 + 다른 페이지)
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
            <SearchIcon src={Search} alt="search" />
          </SearchBar>
        </Nav>
      )}
    </nav>
  );
};

export default NavBar;

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  height: 56px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Pretendard";
  border-bottom: 1px solid #eaddff;
`;

const Title = styled.div`
  font-family: "UhBee Seulvely", sans-serif;
  font-size: 14px;
  margin-left: 92px;
  width: 60px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 200px;
  height: 56px;
  padding: 8px 0px;
  margin-left: 10px;
  margin-right: 0px;
`;

const SearchInput = styled.input`
  width: 176px;
  height: 40px;
  margin: 8px 0px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  padding-left: 15px;
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
  width: 200px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 20px;
  height: 27px;
  margin-left: 56px;
`;

const KeywordContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 856px;
  justify-content: center;
  gap: 0px;
`;

const Category = styled.button.attrs((props) => ({
  isSelected: undefined, // DOM에 전달되지 않도록 설정
}))`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: ${(props) =>
    props.isSelected ? "#f0f0f0" : "transparent"};
  border-bottom: ${(props) =>
    props.isSelected ? "1px solid #65558f" : "none"};
  cursor: pointer;
  transition: all 0.2s;
  padding: 12px 40px;
  border-radius: 8px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CategoryImage = styled.img`
  width: 32px;
  height: 32px;
`;

const CategoryText = styled.p`
  font-size: 14px;
  width: 30px;
  margin: 0;
  color: #666666;
  font-weight: 500;
`;
