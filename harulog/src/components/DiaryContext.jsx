import React, { createContext, useState, useContext } from "react";
import mockData from "../mocks/mockData.json";
import { useQuery } from "@tanstack/react-query";
import CardBGImage from "../assets/CardBGImage.png";
const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: diariesData = [] } = useQuery({
    queryKey: ["diaries"],
    queryFn: () => {
      return mockData.diaries.map((diary) => ({
        ...diary,
        image_data: CardBGImage,
      }));
    },
  });

  // 필터링된 다이어리 계산
  const filteredDiaries = diariesData
    .filter((diary) => !selectedCategory || diary.keyword === selectedCategory)
    .filter(
      (diary) =>
        diary.content &&
        diary.content.toLowerCase().includes(searchContent.toLowerCase())
    );

  // 카테고리 섹션으로 스크롤 이동하는 함수
  const scrollToCategorySection = () => {
    const categorySection = document.getElementById("category-section");
    if (categorySection) {
      const offset = categorySection.offsetTop + 50;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
    scrollToCategorySection();
  };

  const handleScroll = () => {
    if (window.scrollY > 330) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const value = {
    selectedCategory,
    setSelectedCategory,
    searchContent,
    setSearchContent,
    isScrolled,
    handleCategoryClick,
    handleScroll,
    filteredDiaries,
    scrollToCategorySection
  };

  return (
    <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>
  );
};

export const useDiaryContext = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiaryContext must be used within a DiaryProvider");
  }
  return context;
};
