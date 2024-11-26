import DailyLog from "./pages/DailyLog";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import './font.css';

const Container = styled.div`
    display : flex;
    height : 1300px;
    width : 100%;
    justify-content : center;
    background: #FEFFFB;
    margin : 0
    padding : 0
`;

function App() {
  return (
    <Container>
      <Router>
        {/* Header 위치 */}
        <Routes>
          {/* <Route path="/" element={<Main />}></Route> */}
          <Route path="/dailylog" element={<DailyLog />}></Route>
        </Routes>
      </Router>
    </Container>
  );
}
export default App;
