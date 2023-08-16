import { useState } from "react";

const Home = () => {
  const [ username, setUsername ] = useState('');

  const onChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClick = (event) => {
    alert(`picked username: ${username}`);
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
