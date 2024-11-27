import DailyLog from "./pages/DailyLog";
import MainPage from "./pages/MainPage";
import NavBar from "./components/Nav";
import { DiaryProvider } from "./components/DiaryContext";
//import react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import styled from "styled-components";
import "./font.css";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <DiaryProvider>
        <Container>
          <Router>
          <NavBar />
          <MainContent>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/dailylog" element={<DailyLog />}></Route>
            </Routes>
          </MainContent>
          </Router>
        </Container>
      </DiaryProvider>
    </QueryClientProvider>
  );
}
export default App;
const MainContent = styled.main`
  padding-top: 56px; 
`;
