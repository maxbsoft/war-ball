import { put, select, delay, fork, take, call} from 'redux-saga/effects'
import StartupActions, { StartupTypes } from '../Redux/StartupRedux'
import AuthActions, { AuthSelectors, AuthTypes } from '../Redux/AuthRedux'
import * as ConnectedRouter from 'connected-react-router'
import Config from '../Config'

// process STARTUP actions
export function * startup (api, authApi) {
  console.log("[StartupSagas]", "startup", api, authApi);

  let pathname = document.location.pathname;
  if(pathname === "/game"){
    yield put(ConnectedRouter.replace("/"));
  }

  // waiting for the ready routing system
  yield fork(startupNavReadyMonitor, api, authApi);

  yield fork(authSignInAnonymouslySuccessMonitor, api, authApi);
  yield fork(authSignInAnonymouslyFailureMonitor, api, authApi);



  // loading code api, auth, etc
  const currentUser = authApi.getCurrentUser();
  const authState = yield select(AuthSelectors.getState);
  console.log("[StartupSagas]", "startup", "currentUser:", currentUser);
  console.log("[StartupSagas]", "startup", "authState:", authState);

  if(!authState.user || (authState.user && authState.user.isAnonymous)){
    yield put(AuthActions.authSignInAnonymouslyRequest());
  }else{
    // TODO: persistence of auth with the provider
    throw new Error('The persistence of auth with the provider has not been implemented.');
  }
}

function * authSignInAnonymouslySuccessMonitor(api, authApi){
  const payload = yield take(AuthTypes.AUTH_SIGN_IN_ANONYMOUSLY_SUCCESS);
  console.log("[StartupSagas]", "authSignInAnonymouslySuccessMonitor", "payload:", payload);

  console.log(
    "[StartupSagas]",
    "authSignInAnonymouslySuccessMonitor",
    "user.stsTokenManager.expirationTime:",
    new Date(payload.user.stsTokenManager.expirationTime)
  )

  const currentUser = authApi.getCurrentUser();
  console.log("[StartupSagas]", "startup", "currentUser:", currentUser);

  yield fork(startupDone, api, authApi);
}

function * authSignInAnonymouslyFailureMonitor(api, authApi){
  const payload = yield take(AuthTypes.AUTH_SIGN_IN_ANONYMOUSLY_FAILURE);
  console.log("[StartupSagas]", "authSignInAnonymouslyFailureMonitor", "payload:", payload)

  yield fork(startupDone, api, authApi);
}

function * startupDone (api, authApi) {
  // fake delay
  yield delay(500);
  // Done startup.
  yield put(StartupActions.startupSuccess());
}

function * startupNavReadyMonitor(api, authApi) {
  let payload = yield take(StartupTypes.STARTUP_NAV_READY);
  console.log("[StartupSagas]", "startupNavReady");

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
