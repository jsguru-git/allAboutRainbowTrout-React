import React from 'react';
import { FormattedMessage } from 'react-intl';


import './IntroAnimation.scss';

/* eslint-disable react/prefer-stateless-function */
class IntroAnimation extends React.Component {

	componentDidMount(){

		this.doIntroAnimation(this.props.callback);
	
	}

	doIntroAnimation(callback){

		
		let targetLogoEl = document.querySelector("#logo-1");
		let targetLogoEl2 = document.querySelector("#logo-2");
		let targetLogoEl3 = document.querySelector("#logo-3");
		let targetBubble1 = document.querySelector("#bubble-1");
		let targetBubble2 = document.querySelector("#bubble-2");
		let targetBubble3 = document.querySelector("#bubble-3");
		
		let temp = setTimeout(function(){
			targetLogoEl.classList.add('drop-in-first');
		},0);

		temp = setTimeout(function(){
			targetLogoEl2.classList.add('drop-in-first');
		},500);

		temp = setTimeout(function(){
			targetLogoEl3.classList.add('drop-in-first');
			targetLogoEl3.classList.add('float-vertical');


			let temp = setTimeout(function(){

				let bubbleWidth = targetLogoEl3.width / 20;
				let bubbleOffsetTop = targetLogoEl3.height / 4;
				let leftPos = targetLogoEl3.offsetLeft;
				let topPos = targetLogoEl3.offsetTop + bubbleOffsetTop;

				targetBubble1.setAttribute("style","width:" + bubbleWidth + "px;left:" + leftPos + "px;top:" + topPos + "px;");
				temp = setTimeout(function(){
					targetBubble1.classList.add('float-up');
				},1);
				targetBubble2.setAttribute("style","width:" + bubbleWidth + "px;left:" + leftPos + "px;top:" + topPos + "px;");
				temp = setTimeout(function(){
					targetBubble2.classList.add('float-up');
				},750);
				targetBubble3.setAttribute("style","width:" + bubbleWidth + "px;left:" + leftPos + "px;top:" + topPos + "px;");
				temp = setTimeout(function(){
					targetBubble3.classList.add('float-up');
				},1250);

				temp = setTimeout(function(){
					document.querySelector(".intro-container").classList.add("fall-fast");
					temp = setTimeout(callback,750);
				},2250); 

			},250);

		},750);

	}
	
	render() {
	    return (
	    	<section className="intro-container">
				<div className="intro-image-container text-center">
					<img id="logo-1" src="/logo-1.png"/>
					<img id="logo-2" src="/logo-2.png"/>
					<img id="logo-3" src="/logo-3.png"/>
					<img id="bubble-1" src="/bubble.png"/>
					<img id="bubble-2" src="/bubble.png"/>
					<img id="bubble-3" src="/bubble.png"/>
				</div>
			</section>
	    );
	}
}

export default IntroAnimation;
