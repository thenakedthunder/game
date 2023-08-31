import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Game = () => {
  const router = useRouter();

  const [stake, setStake] = useState(0);
  const [money, setMoney] = useState(0);
  const [betResult, setBetResult] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState('true')

  const userName = router.query.name;

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await getMoneyFromAPI();
      
      setMoney(apiResult);
    };
  
    fetchData()}, []
  );

  const getMoneyFromAPI = async () => {
    try {
      const res = await fetch(`api/getPlayerMoney?name=${userName}`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    const numberInput = event.target.value;

    if(numberInput > money) {
      setBetResult('You cannot bet more than what you have and cannot get credit for gambling (at least not from us)');
      setIsButtonDisabled(true);
      return;
    }

    setBetResult('');
    setIsButtonDisabled(numberInput > 0 ? false : true);
    setStake(Number(event.target.value));
  };

  const rollTheWheel = async () => {
    const randomNumberBetweenZeroAndTwo = Math.floor(Math.random() * 3);

    let moneyLeft = money;
    switch (randomNumberBetweenZeroAndTwo) {
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
      router.push({ pathname: '/game', query: { name: userName } });
      await updateMoneyInDatabase(userName, moneyLeft);
    }
  };

  async function updateMoneyInDatabase(userName, moneyLeft) {
    try {
      const res = await fetch(`api/updateMoney`, {
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
        <input type="number" min="1" max={money} onChange={handleChange} />
      </div>
      <button 
        onClick={rollTheWheel}
        disabled={isButtonDisabled}
      >
        Roll the wheel
      </button>
      <p>{betResult}</p>
    </>
  );
}

export default Game;
