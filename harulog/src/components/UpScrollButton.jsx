import UpArrow from "../assets/icon_Arrow.svg";
import styled from "styled-components";

const UpScrollButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button onClick={handleScrollToTop}>
      <StyledImg src={UpArrow} alt="up" />
    </Button>
  );
}

export default UpScrollButton;

const Button = styled.button`
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 20px;
  right: 20px;
  border: none;
  border-radius: 50%;
  background-color: #65558F;
  cursor:pointer;
`;

const StyledImg = styled.img`
  &:hover {
    content: url(${props => props.hoverSrc});
  }
`;