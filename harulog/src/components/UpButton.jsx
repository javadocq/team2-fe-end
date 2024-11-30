import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from "./BASE_URL";
import Smile from "../assets/icon_smile.svg";

const UpButton = ({ diaryId, onLike, children }) => {
  const queryClient = useQueryClient();

  const handleLike = async () => {
    try {
      await axios.patch(`${BASE_URL}/diaries/${diaryId}/likes`);
      onLike(diaryId);
      const currentData = queryClient.getQueryData(["diaries"]);
      queryClient.setQueryData(["diaries"], currentData);
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
    <StyledButton onClick={handleLike}>
      <img src={Smile} alt="smile" />
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
  background: white;
  cursor: pointer;
  font-size: 12px;
  font-family: Pretendard;
  transition: background 0.2s ease;

  &:hover {
    background: #eaddff;
    color: #ffffff;
  }

  &:active {
    animation: clickEffect 0.2s;
  }

  @keyframes clickEffect {
    0% {
      background: #eaddff;
    }
    50% {
      background: white;
    }
    100% {
      background: #eaddff;
    }
  }

  img {
    width: 16px;
    height: 16px;
  }
`;