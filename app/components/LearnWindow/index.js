import React from 'react';
import { FormattedMessage } from 'react-intl';

import './LearnWindow.scss';

/* eslint-disable react/prefer-stateless-function */
class LearnWindow extends React.Component {

	constructor(props){
		super(props);
		this.windowElement = React.createRef();
		this.hideLoadingAnimation = this.hideLoadingAnimation.bind(this);
		this.state = {
			width: "100%",
			height: "",
			left: "",
			top: "",
			loading: true
		};
	}
	componentDidMount(){

		this.renderTiles();
	
		this.renderGameComponent = this.renderGameComponent.bind(this);
		this.renderLearnComponent = this.renderLearnComponent.bind(this);
	
	}

	renderTiles(){

		let windowElement = this.windowElement.current;
		let windowElementRenderedDimensions = windowElement.getBoundingClientRect();
		let { width, height, top, left } = this.state;
		let isLandscape = windowElementRenderedDimensions.width > windowElementRenderedDimensions.height;
		let windowImageSize = {
			width:800,
			height:576
		};
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

	}

	renderGameComponent(context){
		context.props.rendercomponent("gameComponent",true);
	}

	renderLearnComponent(context){
		context.props.rendercomponent("learnComponent",true);
	}

	hideLoadingAnimation(){
		this.setState({
			loading: false
		})
	}

	render() {
		const { width, height, left, top, loading} = this.state;
		const loadingState = loading === true ? "" : "hidden";
    return (
    	<section style={{"width":width,"height":height,"left":left,"top":top}} className="window-learn drop-in" ref={this.windowElement}>

				<div className="content-container">
				<iframe width="90%" src="https://www.youtube.com/embed/Cku8DC7J-gE?rel=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
					<img className={"loading " + loadingState} src="/loading.gif" alt="loading"/>
				</div>

			</section>
		);
	}
}

export default LearnWindow;
