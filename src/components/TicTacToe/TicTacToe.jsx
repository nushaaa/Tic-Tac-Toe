import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {

  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(""); 

  const toggle = (e, num) => {
    if (lock || data[num]) return;

    const newData = [...data];
    newData[num] = count % 2 === 0 ? "X" : "O";

    setData(newData);
    setCount(count + 1);

    checkWin(newData);  

    
    if (!newData.includes("") && !winner) {
      setWinner("Draw");
      setLock(true);
    }
  };

  
  const checkWin = (board) => {
    if(board[0] === board[1] && board[1] === board[2] && board[2] !== "") { won(board[0]); }
    else if(board[3] === board[4] && board[4] === board[5] && board[5] !== "") { won(board[3]); }
    else if(board[6] === board[7] && board[7] === board[8] && board[8] !== "") { won(board[6]); }
    else if(board[0] === board[3] && board[3] === board[6] && board[6] !== "") { won(board[0]); }
    else if(board[1] === board[4] && board[4] === board[7] && board[7] !== "") { won(board[1]); }
    else if(board[2] === board[5] && board[5] === board[8] && board[8] !== "") { won(board[2]); }
    else if(board[0] === board[4] && board[4] === board[8] && board[8] !== "") { won(board[0]); }
    else if(board[2] === board[4] && board[4] === board[6] && board[6] !== "") { won(board[2]); }
  };

  
  const won = (player) => {
    setWinner(player);
    setLock(true);
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner("");
  };

  return (
    <div className='container'>
      <h1 className='title'>Tic Tac Toe Game In <span>React</span></h1>
      <h2 className='winner'>
  {(() => {
    if (winner === "") {
      return "Turn: " + (count % 2 === 0 ? "X" : "O");
    } else if (winner === "Draw") {
      return "It's a Draw!";
    } else {
      return winner + " won!";
    }
  })()}
</h2>


      <div className='board'>
        {data.map((value, index) => (
          <div className='boxes' key={index} onClick={(e) => toggle(e, index)}>
            {value === "X" && <img src={cross_icon} alt="X" />}
            {value === "O" && <img src={circle_icon} alt="O" />}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Restart</button>
    </div>
  );
};

export default TicTacToe;
