import { useRouter } from 'next/router';
import { useState } from 'react';

const Game = () => {
  const router = useRouter();
  const [stake, setStake] = useState(0);
  const [money, setMoney] = useState(Number(router.query.money));

  const userName = router.query.name;

  const handleChange = event => {
    setStake(Number(event.target.value));
  };
  
  const rollTheWheel = async () => {
    const randomNumberBetweenZeroAndTwo = Math.floor(Math.random() * 3);
    console.log(money);
    console.log(stake);
    let moneyLeft = null;
    switch(randomNumberBetweenZeroAndTwo) {
      case 0:
        console.log("Bankrupt!");
        console.log(money - stake);
        moneyLeft = money - stake;
        try {
          const res = await fetch(`http://localhost:3000/api/updateMoney`, {
            method: 'PUT',
            body: JSON.stringify({
              data:{name:userName, money:moneyLeft}, 
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
        break;
      case 1:
        console.log("Keep")
        console.log(money)
        break;
      case 2:
        console.log("Double")
        console.log(money + stake)
        moneyLeft = money + stake;
        try {
          const res = await fetch(`http://localhost:3000/api/updateMoney`, {
            method: 'PUT',
            body: JSON.stringify({
              data:{name:userName, money:moneyLeft}, 
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
  };

  return (
    <>
    <p>{`player name: ${name}`}</p>
    <p>{`current money: ${money}`}</p>
    <div>
      <p>Way of betting:</p>
      <input type="number" min="1" max={money} onChange={handleChange}/>
    </div>
    <button onClick={rollTheWheel}>Roll the wheel</button>
    </>
  );
} 

export default Game;
