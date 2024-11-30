import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const SpinnerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const LoadingSpinner = () => {
    return (
        <SpinnerContainer>
            <BeatLoader color="#000000" margin={5} size={15} />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;