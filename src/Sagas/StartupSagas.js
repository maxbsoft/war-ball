import { put, select, delay, fork, take} from 'redux-saga/effects'
import StartupActions, { StartupTypes } from '../Redux/StartupRedux'
import * as ConnectedRouter from 'connected-react-router'
import Config from '../Config'

// process STARTUP actions
export function * startup (api, authApi) {
  console.log("STURTUP", api, authApi);

  let pathname = document.location.pathname;
  console.log("pathname:", pathname)
  if(pathname === "/game"){
    yield put(ConnectedRouter.replace("/"))
  }

  yield fork(startupNavReadyMonitor, api, authApi);
  // loading code api, auth, etc

  // fake delay
  yield delay(1000);
  yield put(StartupActions.startupSuccess());
}

function * startupNavReadyMonitor(api, authApi) {
  let payload = yield take(StartupTypes.STARTUP_NAV_READY);
  console.log("startupNavReady");

  // loading assets
  // ...
  // ...
  // fake loading
  for(let progress = 0; progress < 100; progress++){
    yield put(StartupActions.startupUpdateProgress(progress));
    yield delay(10);
  }

  // start game screen
  yield put(ConnectedRouter.replace("/game"));

}
