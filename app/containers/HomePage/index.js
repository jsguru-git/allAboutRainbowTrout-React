/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import Menubar from 'components/Menubar';
import IntroAnimation from 'components/IntroAnimation';
import MainWindow from 'components/MainWindow';
import GameWindow from 'components/GameWindow';
import LearnWindow from 'components/LearnWindow';



// import { loadRepos } from '../App/actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */

  constructor(props) {
   super(props);

   let disableIntro = location.search.indexOf("intro=false") > 0;
   this.renderComponent = this.renderComponent.bind(this);

   this.state = {
    isIntroAnimationDone : disableIntro,
    gameComponent: false,
    learnComponent: false
   }
  }
  
  componentDidMount() {
    window.moveTo(0,0);
  }

  introAnimationCallback(){
    this.setState({
      isIntroAnimationDone : true
    })
  }

  renderComponent(componentName,shouldRender){
    this.setState({
      [componentName] : shouldRender
    });
  }

  render() {
    const {isIntroAnimationDone, gameComponent, learnComponent} = this.state;
    const introAnimationElement = <IntroAnimation callback={()=>this.introAnimationCallback()} />;
    return (

      <article>

        {!isIntroAnimationDone ?  introAnimationElement : ''}

        {
          isIntroAnimationDone === true && (gameComponent === false && learnComponent === false) ?
            <MainWindow rendercomponent={this.renderComponent}/>
          : null
        }

        {
          gameComponent ? 
            <GameWindow rendercomponent={this.renderComponent}/> 
          : null
        }

        {
          learnComponent ? 
            <LearnWindow rendercomponent={this.renderComponent}/> 
          : null
        }

      </article>

    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps
);

const withReducer = injectReducer({ key: 'splash', reducer });
const withSaga = injectSaga({ key: 'splash', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
