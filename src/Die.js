import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  static defaultProps = {
    dieNames: ["one", "two", "three", "four", "five", "six"],
  }
  constructor(props) {
    super(props);
    this.toggleLock = this.toggleLock.bind(this)
    }
  toggleLock() {
    const {gameOver} = this.props;
    if(!gameOver){
      this.props.handleClick(this.props.idx);
    }
  }
  render() {
    const { dieNames, locked, val, disabled, isRolling } = this.props;
    let classes = `Die fas fa-dice-${dieNames[val - 1]} `;
    if(locked) {classes += 'Die-locked'};
    if(isRolling) {classes += 'Die-rolling'};
    return (
      <i
        className={classes}
        onClick={this.toggleLock}
        disabled={disabled}
      >
      </i>
    );
  }
}

export default Die;
