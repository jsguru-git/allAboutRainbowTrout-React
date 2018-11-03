import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import './GameOver.scss';

class GameOver extends React.Component {

	constructor(props){
		super(props);
		const { counter } = this.props;
		this.state = {};
		// this.restart = this.restart.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.status){
			// this.setState((){
			// 	status
			// })
		}
	}

	render() {
		let { status, score, restart } = this.props;
		const starsSrc = score > 0 ? "/3stars.png" : "/3stars_off.png";
		return (
			status ? (
				<div className="gameOver-container">
					<div className="message animate-pop-in text-shadow">
					{score > 0 ? "You Win!" : "You Lose :("}
					</div>
					
					<div className="score-container">
						<div className="score text-shadow">{score}</div>
						<img className="stars" src={starsSrc} alt="3 stars"/>
					</div>

					<div className="restart-container">
						<img onClick={()=>restart()} className="button-restart" src="/button_restart.png"/>
					</div>

					<div className="home-container">
						<img onClick={()=>this.props.gohome()} className="button-home" src="/button_home.png"/>
					</div>
					
				</div>
			) : null
		)
	}
}

export default GameOver;
