import React, {useState} from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Tweet from './components/Tweet';
import Nav from './components/Nav';
import About from './components/About';
import Shop from './components/Shop';


function App (){

  const [users, setUser] = useState([
    { name: "Jay", message:"wazzup"},
    { name: "Zey", message:"bitchzezzzeze"},
    { name: "Ney", message:"damsn chill bruh"}
  ]);


  

  const [isRed, setRed]= useState(false)
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count+1);
    setRed(!isRed);
  };


  return(
    <div className="App">
      <div className={isRed ? 'red': ''}>Change my color!</div>
      <button onClick={increment}>Increment</button>
      <h1>{count}</h1>

      <Tweet name="anon1" message="hey yo "/>

      {users.map(users =>(
        <Tweet name={users.name} message={users.message}/>

      
      
      ))}

    </div>

  );
}

export default App;