import { useEffect, useState } from "react";
import { getVotes } from "../api/vote";
import { useNavigate } from "react-router-dom";

export default function Vote() {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getVotes();
        console.log("투표 목록:", res);
        setVotes(res);
      } catch (err) {
        console.error("투표 조회 실패:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>투표 전체 목록</h2>
      <ul>
        {votes.map((vote) => (
          <li
            key={vote.voteId}
            onClick={() => navigate(`/votes/${vote.voteId}`)}
          >
            <h3>{vote.voteName}</h3>
            <p>{vote.voteDescription}</p>
            <p>
              {new Date(vote.startTime).toLocaleString()} ~{" "}
              {new Date(vote.endTime).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
