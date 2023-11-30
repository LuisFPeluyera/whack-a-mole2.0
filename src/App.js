
import './App.css';
import hole from './assets/hole.png'
import mole from './assets/mole.png'
import { useRef, useEffect, useState} from "react";


function App() {
  const [ score, setScore ] = useState(0);
  const [ moles , setMoles ] = useState( new Array(9).fill(false));
  const [ targetScore, setTargetScore ] = useState(5);
  const [ difficulty, setDifficulty ] = useState(700);


  function setMoleVisibility (idx, isVisible){
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[idx] = isVisible;
      return newMoles;
    });
  }

  function wackMole(idx){
    if(!moles[idx]) return;
    setMoleVisibility(idx,false);
    setScore((score) => score + 1);
  }


  useEffect(()=> {
    const interval = setInterval(()=>{
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);
      const newMoles = [...moles];
      newMoles[randomIndex] = true;
      setMoles(newMoles);

      if (targetScore < 1){
        alert("Enter a Number between 1 and  ∞ ");
        setTargetScore(5);
        return;
      }
      if (score === targetScore) {
        alert("You win");
        setScore(0);
      }
      setTimeout(()=>{
        setMoleVisibility(randomIndex, false);
      },difficulty);
    },1000);


    return () =>{
      clearInterval(interval);
    }

  },[moles]);

  useEffect(()=>{
    console.log(difficulty);
  },[difficulty])




  return (
      <>
        <div className="header">
          <h1>Score: {score}</h1>
          <div className="difficulty">
            <a onClick={()=> setDifficulty((prevState)=> 950)} >Easy</a>
            <a onClick={()=> setDifficulty((prevState) => 700)} >Medium</a>
            <a onClick={()=> setDifficulty((prevState)=> 500)} >Hard</a>
          </div>
          <h2> Set Target Score:
            <input value={targetScore} min="1" className="targetScoreInput" type='text' onChange={(e)=>{ setTargetScore(Number(e.target.value)) }}/>
          </h2>
        </div>
        <div className="grid">
            {moles.map((isMole, idx) =>{
               return <img
                   key={idx}
                   src={isMole ? mole : hole}
                   onClick={()=>{
                   wackMole(idx);
               }}
               />
            })}
          <div></div>
          <h3>Difficulty : {(difficulty === 950) ? "Easy" :(difficulty === 700) ? "Medium" : "Hard"} </h3>
        </div>

      </>
  );
}

export default App;
