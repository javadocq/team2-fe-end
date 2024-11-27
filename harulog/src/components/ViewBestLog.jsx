import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mockData from '../mocks/mockData.json';

const ViewPage = () => {
  const [activeTab, setActiveTab] = useState('mostViewed');
  const navigate = useNavigate();

  // 데이터가 있는지 확인
  const mostViewedLogs = mockData.length > 0
    ? mockData.sort((a, b) => b.views - a.views).slice(0, 3)
    : [];

  const mostLikedLogs = mockData.length > 0
    ? mockData.sort((a, b) => b.likes - a.likes).slice(0, 3)
    : [];

  const logsToDisplay = activeTab === 'mostViewed' ? mostViewedLogs : mostLikedLogs;

  return (
    <ViewPageContainer>
      <TabContainer>
        <TabButton
          isActive={activeTab === 'mostViewed'}
          onClick={() => setActiveTab('mostViewed')}
        >
          가장 많이 본 로그
        </TabButton>
        <TabButton
          isActive={activeTab === 'mostLiked'}
          onClick={() => setActiveTab('mostLiked')}
        >
          가장 추천 많은 로그
        </TabButton>
      </TabContainer>

      <LogContainer>
        {logsToDisplay.map((log, index) => (
          <LogCard key={log.id} onClick={() => navigate(`/diary/${log.id}`)}>
            <LogNumber>{index + 1}</LogNumber>
            <LogContent>
              <LogKeyword>{log.keyword}</LogKeyword>
              <LogText>{log.content.slice(0, 50)}...</LogText>
            </LogContent>
          </LogCard>
        ))}
      </LogContainer>
    </ViewPageContainer>
  );
};

const ViewPageContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: ${(props) => (props.isActive ? '#6750a4' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #6750a4;
    color: white;
  }
`;

const LogContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const LogCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #6750a4;
  margin-right: 16px;
`;

const LogContent = styled.div`
  flex: 1;
`;

const LogKeyword = styled.div`
  font-size: 14px;
  color: #6750a4;
  margin-bottom: 8px;
`;

const LogText = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.4;
`;

export default ViewPage;
