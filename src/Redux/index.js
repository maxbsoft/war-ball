import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import { createBrowserHistory  } from "history";
import ReduxPersist from '../Config/ReduxPersist'
import { connectRouter } from 'connected-react-router'
export const history = createBrowserHistory()

/* ------------- Assemble The Reducers ------------- */

export const reducers = combineReducers({
  startup: require('./StartupRedux').reducer,
  router: connectRouter(history),
})

export default (preloadedState) => {
  let finalReducers = reducers

  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga, history, preloadedState)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
