import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Menubar.scss';

/* eslint-disable react/prefer-stateless-function */
class Menubar extends React.Component {

	constructor(props) {
	 super(props);
	 //this.state
	}
	
	componentDidMount(){
		let buttonHome = document.querySelector(".button-home");
		buttonHome.addEventListener("click",function(){

			console.log("GO Home");

		},false);
	}

	render() {
		return (
		  <nav className="menubar">
		    
		    <img className="button-home inline-block drop-in" src="/button_home.png" alt="Home"/>

		  </nav>
		);
	}
}

export default Menubar;
