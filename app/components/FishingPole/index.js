import React from 'react';
import { FormattedMessage } from 'react-intl';
import './FishingPole.scss';
import classnames from 'classnames';

class FishingPole extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isHidden: true
		}
	}

	componentDidMount(){
	}

	componentWillReceiveProps(nextProps){
		if(this.updater.isMounted(this)){
			this.moveFishingPole(nextProps.left);
		}
	}

	addFishingPoleRef(node){
		this.fishingPoleRef = node
	}

	moveFishingPole(newLeftPosition){

		const winWidth = window.innerWidth;
		const fishingPoleWidth = this.fishingPoleRef.style.width;
		// if( newLeftPosition < (window.innerWidth/2)){
			this.fishingPoleRef.style.left = newLeftPosition + "px";
		// }else{
			// this.fishingPoleRef.style.left = (left - fishingPoleWidth) + "px";
		// }

		this.setState({
			isHidden : false
		});

		const tempId = setTimeout(()=>{
			this.setState({
				isHidden: true
			});
		},500);

	}

	render (){
		const { isHidden } = this.state;
		const displayValue = isHidden ? "hidden" : "";
		const animationClassName = isHidden ? "" : "fadeInOut";
		return (
			<div className="fishingPole-container" ref={e => this.addFishingPoleRef(e)}>
				<img className={classnames("fishingPole",displayValue,animationClassName)} src="/fishingPole.png" />
			</div>
		)
	}
}

export default FishingPole;
