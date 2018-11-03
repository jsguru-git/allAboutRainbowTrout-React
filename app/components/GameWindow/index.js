import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReactSVG from 'react-svg';
import HudTimer from '../HudTimer';
import HudScore from '../HudScore';
import Countdown from '../Countdown';
import GameOver from '../GameOver';
import FishingPole from '../FishingPole';

import './GameWindow.scss';

/* eslint-disable react/prefer-stateless-function */
class GameWindow extends React.Component {

	constructor(props){
		super(props);
		let windowHeight = window.innerHeight + "px";
		let windowWidth = window.innerWidth + "px";

		this.fishSrc = "/fish_jumping_animation.gif";
		this.lastFishIndex = 0;
		this.state = {
			winHeight : windowHeight,
			winWidth : windowWidth,
			score : 0,
			timerStart : 15,
			startTimer : false,
			isGameOver: false
		}
		this.fishClicked = false;
		this.startGame = this.startGame.bind(this);
		this.clickFish = this.clickFish.bind(this);
		this.gameOver = this.gameOver.bind(this);
		this.restart = this.restart.bind(this);
		this.maxFish = 9;
		this.fishRefs = [];
		this.goHome = this.goHome.bind(this);
	}

	componentDidMount(){
	}

	addFishRef(node){
		if(this.fishRefs.length < this.maxFish){
			this.fishRefs.push(node);
		}
	}

	clickFish(e){
		if(!this.fishClicked){
			this.fishClicked = true;
			const newScore = this.state.score + 1;
			this.setState( prevState => {
				return { 
					score : newScore,
					fishingPoleLeftPosition: e.touches[0].pageX
				}
			});
		}
	}

	startShowingFish(){

		const showRandomFish = () => {
			const maxFish = 8;
			const nextRandomIndex = Math.floor(Math.random() * 8);
			this.fishRefs[this.lastFishIndex].removeEventListener("touchstart",this.clickFish,true);
			this.fishClicked = false;
			this.fishRefs[this.lastFishIndex].src = "";
			this.fishRefs[nextRandomIndex].addEventListener("touchstart",this.clickFish,true);
			this.fishRefs[nextRandomIndex].src = this.fishSrc;
			const nextFish = this.fishRefs[nextRandomIndex];
			this.lastFishIndex = nextRandomIndex;
		};

		this.fishIntervalId = setInterval(() => {
			if(!this.state.isGameOver){
				showRandomFish();
			}else{
				clearInterval(this.fishIntervalId);
			}
		},1600);

	}

	startGame(){
		this.setState(() => {
			return { startTimer : true }
		});

		this.startShowingFish();
	}

	gameOver(){
		this.setState(() => {
			return { 
				isGameOver : true,
				startTimer : false
			}
		});
	}

	restart(){
		this.setState(() => {
			return { 
				isGameOver: false,
				score: 0
			}
		});
	}

	goHome(){
		this.props.rendercomponent("gameComponent",false);
	}

	render() {
		
		const { fishingPoleLeftPosition, winHeight, timerStart, startTimer, isGameOver, score } = this.state;

	    return (

	    	<section className="window-game" style={{"height" : winHeight}}>

					<div className="fish-container fish-small-container">

						<img className="fish fish-small" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-small" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-small" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-small" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-small" ref={e => this.addFishRef(e)}/>

					</div>


					<div className="fish-container fish-big-container">

						<img className="fish fish-big" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-big" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-big" ref={e => this.addFishRef(e)}/>
						<img className="fish fish-big" ref={e => this.addFishRef(e)}/>

					</div>

					<div className="wave-container">
						<ReactSVG path="/waves.svg" />
					</div>

					<FishingPole left={fishingPoleLeftPosition}/>

					<div className="hud-container">
						{
							!isGameOver ? (
								<HudScore score={score}/>					
							) : null
						}

						{
							!isGameOver ? (
								<HudTimer time={timerStart} start={startTimer} callback={this.gameOver}/>				
							) : null
						}
					</div>

					{
						!isGameOver ? (
							<Countdown counter={3} callback={this.startGame}/>
						) : null
					}

					<GameOver gohome={this.goHome} restart={this.restart} status={isGameOver} score={score}/>

	    	</section>
	    );
	}
}

export default GameWindow;
