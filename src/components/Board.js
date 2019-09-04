import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {  
  renderSquare(i) {
    return (
        <Square
          key={i}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)} 
        />
    );
  }

  setupSquares = () => {
    let row = [];
    for(let i = 0; i < 3; i++){
      let col = [];
      for(let j = 0; j < 3; j++){
        let val = j + (i * 3);
        col.push(this.renderSquare(val))
      }
      row.push(<div className="board-row" key={i}>{col}</div>)
    }
    return row;
  }

  render() {
  
    return (
      <div>
        {this.setupSquares()}
      </div>
    );
  }
}

export default Board;