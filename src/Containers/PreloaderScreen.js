import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import logo from '../logo.svg';
import '../App.css';

function PreloaderScreen(props) {
  const { progress } = props;
  useEffect(() => {
    props.startupNavReady();
  }, [0])

  return (
    <div className="App">
      <header className="App-header">
        <p>{progress}%</p>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    progress: state.startup.progress
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
    startupNavReady: () => dispatch(StartupActions.startupNavReady())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreloaderScreen);
