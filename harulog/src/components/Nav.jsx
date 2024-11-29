import React, { useState, useEffect } from "react";
//import style
import styled from "styled-components";

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
import { useDiaryContext } from "./DiaryContext";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const NavBar = () => {
  const { 
    searchContent, 
    setSearchContent,
    isScrolled,
    scrollToCategorySection,
    setSelectedCategoryId,
    selectedCategoryId,
    handleScroll,
    handleLogoClick
  } = useDiaryContext();
  // const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  // 스크롤 상태에 따른 Nav 구성
  useEffect(() => {
    if (isMainPage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMainPage, handleScroll]);

  // 카테고리 목록
  const [category] = useState([
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

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      {isMainPage && isScrolled ? (
        <>
          <Nav>
            <Logo onClick={handleLogoClick}>
              <LogoImg src={LogoImage} alt="logo" />
              <Title style={{ marginLeft: "8px" }}>하루로그</Title>
            </Logo>
            <KeywordContainer>
              {category.map((category) => (
                <Category
                  key={category.id}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    scrollToCategorySection();
                  }}
                  $isSelected={selectedCategoryId === category.id}
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
        <Nav>
          <Logo onClick={handleLogoClick}>
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
  max-width: 100%;
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
  width: 140px;
  height: 40px;
  margin: 8px 0px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  padding-left: 15px;
  padding-right: 40px;
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
