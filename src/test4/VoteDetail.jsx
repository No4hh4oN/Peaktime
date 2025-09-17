import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVoteDetailById } from "../api/vote";

export default function VoteDetail() {
    const { id } = useParams();
  const [vote, setVote] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const voteRes = await getVoteDetailById(id);
        console.log("투표 상세:", voteRes);
        setVote(voteRes);
      } catch (err) {
        console.error("투표 상세 조회 실패:", err);
      }
    }
    fetchData();
  }, [id]);

  if (!vote) return <p>불러오는 중...</p>;

  return (
    <div>
      <h3>{vote.voteName}</h3>
      <p>{vote.voteDescription}</p>
      <p>
        🕒 {new Date(vote.startTime).toLocaleString()} ~{" "}
        {new Date(vote.endTime).toLocaleString()}
      </p>

      <h4>선택지</h4>
      <ul>
        {vote.choices.map((choice) => (
          <li key={choice.choiceId}>
            <button
              onClick={() =>
                alert(`선택지 [${choice.choiceText}] (ID: ${choice.choiceId}) 선택`)
              }
            >
              {choice.choiceText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
