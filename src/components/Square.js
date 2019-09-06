import React from 'react';

const Square = (props) => {
  let isWinningSquare
  if(props.winningMoves){
    if(props.index === props.winningMoves[0] || props.index === props.winningMoves[1] || props.index === props.winningMoves[2])
      isWinningSquare = true;
    else isWinningSquare = false;
  }

  return(
    <button className={`${isWinningSquare ? "winning-square": "square"}`} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square;
