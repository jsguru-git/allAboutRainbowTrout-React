import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import './Countdown.scss';

class Countdown extends React.Component {

	constructor(props){
		super(props);
		const { counter } = this.props;
		this.state = {
			isDone : false
		};
	}

	componentDidMount() {
		this.startCountdown();
	}

	startCountdown(){
		
		const { counter } = this.props;

		this.setState((prevState) => {
			return { counterIndex : this.props.counter }
		});

		this.counterIntervalId = setInterval(() => {
			
			const { counterIndex } = this.state;
			if(counterIndex >= 0){
				this.setState((prevState) => {
					return { counterIndex : (prevState.counterIndex - 1) }
				});
			}else{
				clearInterval(this.counterIntervalId);
				this.setState({
					isDone : true
				});
				this.props.callback();
			}
		},1000);

	}

	componentWillUnmount(){
		this.setState({
			isDone : false
		})
	}

	render() {
		let { counter } = this.props;
		const { isDone } = this.state;
		const countdownElements = [];
		const counterItemClassName = 'counter-item';
		const counterIndex = this.state.counterIndex || counter;
		for(let i = 0; i <= counter; i++){
			const displayClassName = i === this.state.counterIndex ? 'animate-pop-in' : false;
			const element = i > 0 ? (
				<span key={'counter-'+i.toString()} className={classnames(counterItemClassName, displayClassName)}>{i}</span>
			) : (
				<span key={'counter-'+i.toString()} className={classnames(counterItemClassName, displayClassName)}>GO!</span>
			);
			countdownElements.push(element);
		}

		return !isDone ? (
			<div className="countdown-container">
				{countdownElements}
			</div>
		) : null
	}
}

export default Countdown;
