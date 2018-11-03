import React from 'react';
import { FormattedMessage } from 'react-intl';

import './MainWindow.scss';

/* eslint-disable react/prefer-stateless-function */
class MainWindow extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			"width": "100%",
			"height": "",
			"left": "",
			"top": ""
		};
	}

	componentDidMount(){

		this.renderTiles();
	
		this.renderGameComponent = this.renderGameComponent.bind(this);
		this.renderLearnComponent = this.renderLearnComponent.bind(this);

	}

	renderTiles(){

		let windowElement = document.querySelector(".window-main");
		let windowElementRenderedDimensions = windowElement.getBoundingClientRect();
		let { width, height, left, top } = this.state;
		const windowImageSize = {
			width:800,
			height:576
		};

		let tileImageSize = {
			width: 213,
			height:297
		};

		let isLandscape = windowElementRenderedDimensions.width > windowElementRenderedDimensions.height;

		windowImageSize.ratio = isLandscape ? windowImageSize.width / windowImageSize.height : windowImageSize.height / windowImageSize.width;

		//set windowElement width
		if(isLandscape){
			let newWindowElementWidth = windowElementRenderedDimensions.height * windowImageSize.ratio;
			//check if screen is bigger than natural image size (setting max-width/max-height)
			if(newWindowElementWidth > windowImageSize.width){
				newWindowElementWidth = windowImageSize.width;
				height = windowImageSize.height + "px";
				top = ((windowElementRenderedDimensions.height - windowImageSize.height)/2) + "px";
			}
			width = newWindowElementWidth + "px";
			left = ((windowElementRenderedDimensions.width - newWindowElementWidth) / 2) + "px";
		}else{
			let newElementHeight = (windowElementRenderedDimensions.width * windowImageSize.ratio);
			//check if screen is bigger than natural image size (setting max-width/max-height)
			if(newElementHeight > windowImageSize.height){
				newElementHeight = windowImageSize.height;
				width = windowImageSize.width + "px";
				left = ((windowElementRenderedDimensions.width - windowImageSize.width)/2) + "px";
			}
			height = newElementHeight + "px";
			top = ((windowElementRenderedDimensions.hfeight - newElementHeight) / 2) + "px";
		}

		this.setState({
			"width": width,
			"height": height,
			"left": left,
			"top": top
		});

		let shortTileDelay = 0;
		var allTiles = windowElement.querySelectorAll(".tile");
		for(let tile of allTiles){
			(function(){
				shortTileDelay = setTimeout(function(){
					tile.classList.add("slide-in");
				},550);
			})();
		}
	}

	renderGameComponent(context){
		// buttonPlay.addEventListener(clickEvent,() => {
			context.props.rendercomponent("gameComponent",true);
		// });
	}

	renderLearnComponent(context){
		context.props.rendercomponent("learnComponent",true);
	}

	render() {
		const { width, height, left, top } = this.state;
    return (
    	<section className="window-main drop-in" style={{"width":width,"height":height,"left":left,"top":top}}>

				<div className="tile-container">

					<button onClick={()=>this.renderGameComponent(this)} className="tile button-tile-play">
					    <img className="tile-play" src="/tile_play.png"/>
					</button>

					<button onClick={() => this.renderLearnComponent(this)} className="tile button-tile-learn">
						<img className="tile-learn" src="/tile_learn.png"/>
					</button>

				</div>

			</section>
		);
	}
}

export default MainWindow;
