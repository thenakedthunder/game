import { useRouter } from 'next/router';
import { useState } from 'react';

const Game = () => {
  const router = useRouter();

  const [stake, setStake] = useState(0);
  const [money, setMoney] = useState(Number(router.query.money));
  const [betResult, setBetResult] = useState('');

  const userName = router.query.name;

  const handleChange = event => {
    setStake(Number(event.target.value));
  };
  
  const rollTheWheel = async () => {
    const randomNumberBetweenZeroAndTwo = Math.floor(Math.random() * 3);

    let moneyLeft = money;
    switch(randomNumberBetweenZeroAndTwo) {
      case 0:
        setBetResult("Bankrupt!");
        moneyLeft = money - stake;

        break;
      case 1:
        setBetResult("Keep");

        break;
      case 2:
        setBetResult("Double")
        moneyLeft = money + stake;
    }

    if (moneyLeft !== null) {
      router.push({pathname: '/game', query: { name: userName, money: moneyLeft}});
      await updateMoneyInDatabase(userName, moneyLeft);
    }
  };

  async function updateMoneyInDatabase(userName, moneyLeft) {
    try {
      const res = await fetch(`http://localhost:3000/api/updateMoney`, {
        method: 'PUT',
        body: JSON.stringify({
          data: { name: userName, money: moneyLeft },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
  
      const data = await res.json();
      setMoney(data.money);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <p>{`player name: ${userName}`}</p>
    <p>{`current money: ${money}`}</p>
    <div>
      <p>Way of betting:</p>
      <input type="number" min="1" max={money} onChange={handleChange}/>
    </div>
    <button onClick={rollTheWheel}>Roll the wheel</button>
    <p>{betResult}</p>
    </>
  );
} 

export default Game;
