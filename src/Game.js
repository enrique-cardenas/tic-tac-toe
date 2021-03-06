import React, { Component } from 'react';
import Board from './components/Board';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: -1, // last column position
        row: -1, // last row position
      }],
      stepNumber: 0,
      xIsNext: true,
      moveOrder: "descending"
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares).winner || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        col: i % 3,
        row: Math.floor(i / 3)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  reverseMoves() {
    this.setState({
      moveOrder: this.state.moveOrder === "descending" ? "ascending" : "descending"
    });
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winningMoves } = calculateWinner(current.squares);
    

    let moves = history.map((step, move) => {
      const desc = move ? 
        `Go to move # ${move} with location: (${step.col}, ${step.row})` :
        'Go to game start';

      const buttonType = move === this.state.stepNumber ? "current-button" : "not-current-button";
      
      return(
        <li key={move}>
          <button className={buttonType} onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } 
    else if(this.state.history.length === 10){
      status = 'Draw! No winners';
    }
    else{ 
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            winningMoves = {winner ? winningMoves : null}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <br/>
          Current Moves Sorting:
          <button className="toggle-button" onClick={() => this.reverseMoves()}>{this.state.moveOrder}</button>
          <ol>{this.state.moveOrder === "descending" ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++){
    const[a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return { winner: squares[a], winningMoves: [a, b, c] };
    }
  }
  return { winner: null, winningMoves: null };
}
