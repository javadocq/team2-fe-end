import React, { createContext, useState, useContext } from "react";
import mockData from "../mocks/mockData.json";
import { useQuery } from "@tanstack/react-query";
import CardBGImage from "../assets/CardBGImage.png";
import axios from "axios";
import { BASE_URL } from "./BASE_URL";
const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 다이어리 데이터 가져오기
  const { data: diariesData = [] } = useQuery({
    queryKey: ["diaries"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/diaries`);
        return response.data.map((diary) => ({
          id: diary.id,
          image_data: diary.image_data,
          category_id: diary.category_id,
          content: diary.content,
          adapted_content: diary.adapted_content,
          recommended_content: diary.recommended_content,
          recommended_category_id: diary.recommended_category_id,
          likes: diary.likes,
          views: diary.views,
          username: diary.username,
          created_at: diary.created_at
        }));
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
        return [];
      }
    },
  });

  // 필터링된 다이어리 계산
  const filteredDiaries = diariesData
    .filter((diary) => !selectedCategoryId || diary.category_id === selectedCategoryId)
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