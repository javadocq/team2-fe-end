import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
`;

const LoadingSpinner = () => {
    return (
        <SpinnerContainer>
            <BeatLoader color="#000000" margin={5} size={15} />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;