import { useState } from "react";
import styled from "styled-components";
import { useDiaryContext } from "./DiaryContext";

const SortButton = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("created_at");
  const { sortType, setSortType } = useDiaryContext();

  const sortOptions = [
    { value: "created_at", label: "최신순" },
    { value: "views", label: "조회순" },
    { value: "likes", label: "추천순" },
  ];

  const handleSortChange = (value) => {
    setSelectedSort(value);
    setIsOpen(false);
    onSortChange(value);
  };

  return (
    <Container>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {sortOptions.find(option => option.value === sortType)?.label}
        <Arrow $isOpen={isOpen}>▼</Arrow>
      </DropdownButton>
      {isOpen && (
        <DropdownContent>
          {sortOptions.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              $isSelected={selectedSort === option.value}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </Container>
  );
};

export default SortButton;

const Container = styled.div`
  position: relative;
  width: 120px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const Arrow = styled.span`
  margin-left: 8px;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  background: ${props => props.$isSelected ? '#f0f0f0' : 'white'};

  &:hover {
    background-color: #f8f8f8;
  }
`;