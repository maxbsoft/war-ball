import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware/*, { END }*/ from 'redux-saga'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'

// creates the store
export default (rootReducer, rootSaga, history, initialState) => {
  /* ------------- Redux Configuration ------------- */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [];
  // const enhancers = [];

  /* ------------- Navigation Middleware ------------ */
  // TODO: If need
  /*
    const navigationMiddleware = createReactNavigationReduxMiddleware(
      'root',
      state => state.nav
    )
    middleware.push(navigationMiddleware)
  */

  /* ------------- Analytics Middleware ------------- */
  // TODO: If need
  //middleware.push(ScreenTracking

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)
  middleware.push(routerMiddleware(history))


  /* ------------- Assemble Middleware ------------- */

  //enhancers.push(applyMiddleware(...middleware))

  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(applyMiddleware(...middleware))
  )

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
