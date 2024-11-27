import React, { useEffect, useState } from "react";

//import style
import styled from "styled-components";

const Container = styled.div`
    width: 908px;
    height: 56px;
    display: flex;
`;

const CategoryBox = styled.div`
    width: 146px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    background: ${(props) =>
        props.isSelected ? "var(--b10, #FAFAFA)" : "var(--Schemes-On-Primary, #FFF)"};
    border: 1px solid ${(props) =>
        props.isSelected ? "var(--Schemes-Primary, #65558F)" : "var(--b20, #EEE)"};
    border-radius: ${(props) => {
        // isSelected와 isFirst, isLast 여부에 따라 border-radius 적용
        if (props.isFirst) {
            return "10px 0px 0px 10px"; // 첫 번째 카테고리는 왼쪽만 border-radius 적용
        } else if (props.isLast) {
            return "0px 10px 10px 0px"; // 마지막 카테고리는 오른쪽만 border-radius 적용
        }
        return "0px"; 
    }};
`;

export default function Category({ category, select, BeforeSelected }) {
    const [selectedCategory, setSelectedCategory] = useState(BeforeSelected !== "" ? BeforeSelected : null); // 선택된 카테고리 상태


    useEffect(() => {
        if (BeforeSelected) {
            setSelectedCategory(BeforeSelected);
        }
    }, [BeforeSelected]);

    function handleClickCategory(name) {
        if (selectedCategory !== name) {
            setSelectedCategory(name); 
            select(name); 
        }
    }

    return (
        <Container>
            {category.map((item, key) => (
                <CategoryBox
                    key={key}
                    isFirst={key === 0}
                    isLast={key === category.length - 1}
                    isSelected={selectedCategory === item.name} // 선택된 카테고리 확인
                    onClick={() => handleClickCategory(item.name)} // 클릭 시 handleClickCategory 실행
                >
                    <img src={item.img} alt={item.name} />
                    <div>{item.name}</div>
                </CategoryBox>
            ))}
        </Container>
    );
}
