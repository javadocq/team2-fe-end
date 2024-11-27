import React from "react";
import styled from "styled-components";
import Smile from "../assets/icon_smile.svg";
import Check from "../assets/icon_check.svg";

const UpButton = ({ diaryId, isLiked, onLike, children }) => {
  return (
    <StyledButton onClick={() => onLike(diaryId)} $isLiked={isLiked}>
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
  background: ${props => props.$isLiked ? '#eaddff' : 'white'};
  cursor: pointer;
  font-size: 12px;
  font-family: Pretendard;
  color: ${props => props.$isLiked ? '#ffffff' : 'inherit'};

  &:hover {
    background: #eaddff;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
