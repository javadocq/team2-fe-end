import React, { createContext, useState, useContext } from "react";
import mockData from "../mocks/mockData.json";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "./BASE_URL";
const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [searchContent, setSearchContent] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  
  // 다이어리 데이터 가져오기
  const { data: diariesData = [] } = useQuery({
    queryKey: ['diaries'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/diaries`);
      return response.data;
    }
  });

  // 필터링된 다이어리 계산
  // filteredDiaries 로직 수정
  const filteredDiaries = diariesData.filter(diary => {
    if (selectedCategoryId === 0) return true;
    return diary.category_id === selectedCategoryId;
  });

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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(
      selectedCategoryId === categoryId ? null : categoryId
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
    diariesData,
    selectedCategoryId,
    setSelectedCategoryId,
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