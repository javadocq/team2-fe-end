import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from "./BASE_URL";
import Smile from "../assets/icon_smile.svg";
import Check from "../assets/icon_check.svg";

const UpButton = ({ diaryId, isLiked, onLike, children }) => {
  const queryClient = useQueryClient();

  const handleLike = async () => {
    try {
      await axios.patch(`${BASE_URL}/diaries/${diaryId}/likes`);
      
      if (!isLiked) {
        onLike(diaryId);
      }
      
      await queryClient.invalidateQueries(["diaries"]);
      console.log(queryClient.getQueryData(["diaries"]));
    } catch (error) {
      if (error.response?.status === 404) {
        console.error("Diary not found");
      } else if (error.response?.status === 500) {
        console.error("Server error");
      } else {
        console.error("Failed to update like:", error);
      }
    }
  };

  return (
    <StyledButton onClick={handleLike} $isLiked={isLiked}>
      <img src={isLiked ? Check : Smile} alt="smile" />
      {children} 
    </StyledButton>
  );
};

export default UpButton;

const StyledButton = styled.button`
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
  background: ${(props) => (props.$isLiked ? "#eaddff" : "white")};
  cursor: pointer;
  font-size: 12px;
  font-family: Pretendard;
  color: ${(props) => (props.$isLiked ? "#ffffff" : "inherit")};

  &:hover {
    background: #eaddff;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
