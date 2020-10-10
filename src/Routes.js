import React, { Component } from 'react'
import {
  Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { history } from './Redux'
import { connect } from 'react-redux'

import GameScreen from './Containers/GameScreen'
import PreloaderScreen from './Containers/PreloaderScreen'
import SplashScreen from './Containers/SplashScreen'

function Routes(props){
  if(props.startup.success === false){
    return (
      <SplashScreen />
    )
  }
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={PreloaderScreen}/>
        <Route path="/game" component={GameScreen}/>
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    startup: state.startup
  }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
