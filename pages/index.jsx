import { useRouter } from "next/router";
import { useState } from "react";

const Home = () => {
  const [ username, setUsername ] = useState('');
  const router = useRouter();

  const onChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClick = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/createPlayer`, {
        method: 'POST',
        body: JSON.stringify({
          data:{name:username}, 
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });

      const data = await res.json();
      router.push({pathname: '/game', query: { name: data.name }});
    } catch (err) {
      console.log(err);
    }
  }

  return <div>
    <input 
      type="text"
      placeholder="username"
      value={username}
      onChange={onChange}
    />
    <button onClick={handleClick}>Pick</button>
  </div>
};

export default Home;
