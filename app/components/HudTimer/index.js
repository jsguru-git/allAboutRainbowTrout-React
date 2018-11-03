import React from 'react';
import { FormattedMessage } from 'react-intl';
import './HudTimer.scss';

class HudTimer extends React.Component {

	constructor(props){
		super(props);
		const { time } = this.props;
		this.state = {
			timerStarted : false,
			time : time
		}
		this.lastTime = 0;
	}

	componentDidMount(){
		const { start } = this.props;
		if(start){
			this.startTimer();
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.start && this.state.timerStarted === false){
			this.startTimer();
		}
	}

	shouldComponentUpdate(){
		let returnVal = false;
		if(this.state.time !== this.lastTime && this.props.start === true){
			this.lastTime = this.state.time;
			returnVal = true;
		}
		return returnVal;
	}

	startTimer(){
		const { time } = this.state;
		this.setState({
			timerStarted : true
		});
		const decreaseTime = () => {
			const { time } = this.state;
			const newTime = time - 1;
			this.setState(() => {
				return { time : newTime }
			});
		}

		this.timerIntervalId = setInterval(() => {
			if(this.state.time > 0){
				decreaseTime();
			}else{
				clearInterval(this.timerIntervalId);
				this.props.callback();
			}
		},1000);
	}

	componentWillUnmount(){
		clearInterval(this.timerIntervalId);
		this.setState({
			timerStarted : false
		});
	}

	render (){

		const { time } = this.state;
		return (
			<div className="hud-timer-container">
				<img className="hud-timer" src="/hud_time.png"/>
				<span className="time">:{time}</span>
			</div>
		)
	}
}

export default HudTimer;
