import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {

  render() {
    const {score, name, doScore, description, rolling, title } = this.props;
    const disabled = score !== undefined;
    const locked =  score !== undefined || rolling;
    return (
      <tr 
        className={`RuleRow RuleRow-${disabled ? 'disabled' : 'active'}`} 
        onClick={locked ? null : doScore}
        >
        <td className="RuleRow-name" title={title}>{name}</td>
        <td className={`RuleRow-${disabled ? 'score' : 'description'}`}>{disabled ? score : description}</td>
      </tr>
    )
  }
}

export default RuleRow;