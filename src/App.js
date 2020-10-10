import React from 'react';
import { Provider } from 'react-redux'
import createStore, { history } from './Redux'
import { ConnectedRouter } from 'connected-react-router'
import Routes from './Routes'
import './App.css';

export const store = createStore({})

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes/>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
