import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const initialState = {
  dice: Array.from({ length: NUM_DICE }).map(d => 3),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      isRolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        yahtzeeBonus: undefined,
        chance: undefined
      },
      gameOver: false
}
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    // this.state = {...initialState};
    this.roll = this.roll.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.displayGameButton = this.displayGameButton.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  componentDidMount() {
    this.animateRoll();
  }

  resetGame() {
    this.setState(initialState);
    this.animateRoll();
  }
  animateRoll() {
    this.setState({isRolling: true}, () => {
      setTimeout(this.roll, 1000);
    })
  }
  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft >= 1 ? st.rollsLeft - 1 : 0,
      isRolling: false
    }));
  }

  toggleLocked(idx) {
    if(this.state.rollsLeft > 0 && !this.state.isRolling) {
      // toggle whether idx is in locked or not
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // if(this.state.dice.every(x => x !== undefined)){
      // evaluate this ruleFn with the dice and score this rulename
      this.setState( (st) => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
        dice: Array.from({ length: NUM_DICE }).map(d => 3)
      }), () => {
        if(Object.values(this.state.scores).every(x => x !== undefined))
          this.setState({
            gameOver: true,
            locked: Array(NUM_DICE).fill(true)
          })
        });
      // } 
      this.animateRoll();
    }

  displayGameButton() {
    const { rollsLeft, isRolling, locked, gameOver } = this.state
    let numRolls = (rollsLeft < 3) ? `Re-roll (${rollsLeft} Left)` : `Starting Roll`;
    let gameButton;
    if(!gameOver) {
      gameButton = <button className='Game-reroll'
      disabled={ locked.every(x => x) || rollsLeft === 0 || isRolling }
      onClick={this.animateRoll}
      > {numRolls} </button>
    } else {
      gameButton = <button className='Game-reroll'
      onClick={this.resetGame}
      > Play Again? </button>
    } return gameButton;
  }

  render() {
    const { dice, locked, rollsLeft, isRolling, scores, gameOver } = this.state

    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              isRolling={isRolling}
              gameOver={gameOver}
            />
            <div className='Game-button-wrapper'>
              {this.displayGameButton()}
            </div>
          </section>
        </header>
        <ScoreTable 
          doScore={this.doScore}
          sumTotal={this.sumScores} 
          scores={scores}
          isRolling={isRolling}
        />
      </div>
    );
  }
}

export default Game;
