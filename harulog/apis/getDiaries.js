import axios from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

export const diaryAPI = {
  // 전체 다이어리 조회
  getDiaries: async () => {
    const { data } = await axios.get("http://localhost:3005/diaries");
    return data;
  },

  // 키워드로 다이어리 필터링
  getDiariesByKeyword: async (keyword) => {
    const { data } = await axiosInstance.get(`/diaries/${keyword}`);
    return data;
  },

  // 필요한 다른 API 함수들...
};
