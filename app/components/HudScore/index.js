import React from 'react';
import { FormattedMessage } from 'react-intl';
import './HudScore.scss';

class HudScore extends React.Component {

	constructor(props){
		super(props);
		const { score } = this.props;
		this.state = {
			timerIntervalId : 0,
			score : score
		}
		this.lastScore = 0;
	}

	componentDidMount(){
		
	}

	componentWillReceiveProps(nextProps){
		this.setState( () => {
			return {
				score : nextProps.score
			}
		});
	}

	shouldComponentUpdate(){
		let returnVal = false;
		const newScore = this.state.score;
		if(this.state.score !== this.lastScore || this.lastScore === 0){
			returnVal = true;
			this.lastScore = this.state.score;
		}
		return returnVal;
	}

	render (){
		const { score } = this.props;

		return (
			<div className="hud-score-container">
				<img className="hud-score" src="/hud_score.png"/>
				<span className="score">{score}</span>
			</div>
		)
	}
}

export default HudScore;
