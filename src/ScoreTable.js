import React, { Component } from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, yahtzeeBonus, chance } from './Rules';


class ScoreTable extends Component {
  constructor(props) {
    super(props)
    this.getTotalScore = this.getTotalScore.bind(this);
  }
  getTotalScore() {
    const {scores} = this.props;
    let totalScore = 0;
    for(let key in scores) {
    // check if there is a value at scores[key], skip if undefined or null
      if(scores[key]) totalScore += scores[key];
    } return totalScore;
  }
  checkYahtzee() {
    const {scores, doScore} = this.props;
    // check if there is a value at scores[key], skip if undefined or null
    if(scores.yahtzee === 0 || scores.yahtzee === undefined) {
      this.setState({...scores.yahtzeeBonus = 0})
    } else {
      doScore("yahtzeeBonus", yahtzeeBonus.evalRoll)}
    }

  render() {
    const { scores, doScore, isRolling } = this.props;

    return (
      <div className="ScoreTable">
        <section className="ScoreTable-section">
          <h2>Upper Section</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow name="Ones" 
                description={ones.description} title={ones.title} score={scores.ones} 
                doScore={evt => doScore("ones", ones.evalRoll)} rolling={isRolling}/>
              <RuleRow name="Twos" 
                description={twos.description} title={twos.title} score={scores.twos} 
                doScore={evt => doScore("twos", twos.evalRoll)} rolling={isRolling} />
              <RuleRow name="Threes" 
                description={threes.description} title={threes.title} score={scores.threes} 
                doScore={evt => doScore("threes", threes.evalRoll)} rolling={isRolling} />
              <RuleRow name="Fours" 
                description={fours.description} title={fours.title} score={scores.fours} 
                doScore={evt => doScore("fours", fours.evalRoll)} rolling={isRolling} />
              <RuleRow name="Fives" 
                description={fives.description} title={fives.title} score={scores.fives} 
                doScore={evt => doScore("fives", fives.evalRoll)} rolling={isRolling} />
              <RuleRow name="Sixes" 
                description={sixes.description} title={sixes.title} score={scores.sixes} 
                doScore={evt => doScore("sixes", sixes.evalRoll)} rolling={isRolling} />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-lower">
          <h2>Lower Section</h2>
          <table cellSpacing="0">
            <tbody>
              <RuleRow name="Three of Kind" 
                description={threeOfKind.description} title={threeOfKind.title} score={scores.threeOfKind} 
                doScore={evt => doScore("threeOfKind", threeOfKind.evalRoll)} rolling={isRolling} />
              <RuleRow name="Four of Kind" 
                description={fourOfKind.description} title={fourOfKind.title} score={scores.fourOfKind} 
                doScore={evt => doScore("fourOfKind", fourOfKind.evalRoll)} rolling={isRolling} />
              <RuleRow name="Full House" 
                description={fullHouse.description} title={fullHouse.title} score={scores.fullHouse} 
                doScore={evt => doScore("fullHouse", fullHouse.evalRoll)} rolling={isRolling} />
              <RuleRow name="Small Straight" 
                description={smallStraight.description} title={smallStraight.title} score={scores.smallStraight} 
                doScore={evt => doScore("smallStraight", smallStraight.evalRoll)} rolling={isRolling} />
              <RuleRow name="Large Straight" 
                description={largeStraight.description} title={largeStraight.title} score={scores.largeStraight} 
                doScore={evt => doScore("largeStraight", largeStraight.evalRoll)} rolling={isRolling} />
              <RuleRow name="Yahtzee" 
                description={yahtzee.description} title={yahtzee.title} score={scores.yahtzee} 
                doScore={evt => doScore("yahtzee", yahtzee.evalRoll)} rolling={isRolling} />
              <RuleRow name="Yahtzee Bonus" 
                description={yahtzeeBonus.description} title={yahtzeeBonus.title} score={scores.yahtzeeBonus} 
                doScore={evt => this.checkYahtzee()} rolling={isRolling} />
              <RuleRow name="Chance" 
                description={chance.description} title={chance.title} score={scores.chance} 
                doScore={evt => doScore("chance", chance.evalRoll)} rolling={isRolling} />
            </tbody>
          </table>
        </section>
        <section className="ScoreTable-section ScoreTable-section-totals">
          <table cellSpacing="0">
            <tbody>
              <tr>
                <td className="ScoreTable-total">Current Score</td>
                <td className="ScoreTable-score"> {this.getTotalScore()} </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}

export default ScoreTable;