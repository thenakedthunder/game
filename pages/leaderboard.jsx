import { useEffect, useState } from "react";

const LeaderBoard = (props) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await callAPI();
      
      setPlayers(apiResult);
    };
  
    fetchData()}, []
  );

  const callAPI = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/getPlayers`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {players.map((player, index) =>
        <p key={index}>{`player: ${player.name}, money: ${player.money}`}</p>
      )}
    </>
  );
} 

export default LeaderBoard;
