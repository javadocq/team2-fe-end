import React, { useState, useEffect } from "react";
import axios from "axios";

const UpButton = ({
  id,
  initialCount = 0,
  content,
  image_data,
  username,
  password,
}) => {
  const [upCount, setUpCount] = useState(initialCount);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchUpvoteData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/diaries/${id}`);
        setUpCount(response.data.up || 0);
        setHasVoted(response.data.hasVoted);
      } catch (error) {
        console.error("추천 데이터 로딩 실패:", error);
      }
    };

    fetchUpvoteData();
  }, [id]);

  const handleUpClick = async () => {
    const newCount = hasVoted ? upCount - 1 : upCount + 1;

    try {
      setUpCount(newCount);
      setHasVoted(!hasVoted);

      await axios.put(`http://localhost:3005/diaries/${id}`, {
        image_data,
        content,
        username,
        password,
        up: upCount,
      });
    } catch (error) {
      console.error("추천 처리 실패:", error);
    }
  };

  return (
    <button
      onClick={handleUpClick}
      className={`px-4 py-2 rounded transition-colors ${
        hasVoted ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
      } text-white`}
    >
      {hasVoted ? "추천 취소" : "추천"} ({upCount})
    </button>
  );
};

export default UpButton;
