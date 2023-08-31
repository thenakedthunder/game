import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await getPlayersFromAPI();
      
      setPlayers(orderPlayersByMoney(apiResult));
    };
  
    fetchData()}, []
  );

  const getPlayersFromAPI = async () => {
    try {
      const res = await fetch(`api/getPlayers`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const orderPlayersByMoney = (players) => {
    if (!players) {
      return [];
    }
    
    players.sort(playerComparer);
  }

  const playerComparer = (a, b) => {
    if(a.money < b.money) {
      return 1;
    } else if(a.money > b.money) {
      return -1;
    } 
    return 0;
  }

  return (
    <>
      {players.map((player, index) =>
        <p key={index}>{`${index + 1}. player: ${player.name}, money: ${player.money}`}</p>
      )}
    </>
  );
} 

export default LeaderBoard;
