import { call, put, select, delay } from 'redux-saga/effects'
import { path } from 'ramda'
import AuthActions, { AuthSelectors } from '../Redux/AuthRedux'

export function * authSignInAnonymouslyRequest (authApi, { }) {
  try{
    const authResponse = yield call(authApi.signInAnonymously);
    console.log("[AuthSagas]", "authSignInAnonymouslyRequest", "authResponse:", authResponse ? true : false);
    /*
      {
        "additionalUserInfo": null,
        "user": {
          "displayName": null,
          "email": null,
          "emailVerified": false,
          "isAnonymous": true,
          "metadata": [Object],
          "phoneNumber": null,
          "photoURL": null,
          "providerData": [Array],
          "providerId": "firebase",
          "refreshToken":
          "AE0u-NcSLxpcEyo6RcsUh_wUsqBFYfT55jg5DIOvQhsPD7LVlDwBK1oa3CDUcpZJle55x8t5Q9iNPCGBaVEIqJSP_G0Xvroj4qEGnGUTYrLw6ppfukRZJG5o3kV4ErIm9aAXury1drJZncIdje5hOOOpS71zQSdCYeKlRZWihekwATAmpH8VCZU",
          "uid": "R4WWgsd5YPVCUvJwi2yUWaCzb562"
        }
      }
    */
    const user = JSON.parse(JSON.stringify(authResponse.user));
    const additionalUserInfo = JSON.parse(JSON.stringify(authResponse.additionalUserInfo));
    yield put(AuthActions.authSignInAnonymouslySuccess(user, additionalUserInfo));
  }catch(error){
    console.log("[AuthSagas]", "authSignInAnonymouslyRequest", "error:", error);
    yield put(AuthActions.authSignInAnonymouslyFailure(`${error}`));
  }
}

export function * authSignInWithEmailAndPasswordRequest (authApi, { email, password }) {
  try{
    const authResponse = yield call(authApi.signInWithEmailAndPassword, email, password);
    console.log("[AuthSagas]", "authSignInWithEmailAndPasswordRequest", "authResponse:", authResponse);
    const user = JSON.parse(JSON.stringify(authResponse.user));
    const additionalUserInfo = JSON.parse(JSON.stringify(authResponse.additionalUserInfo));
    yield put(AuthActions.authSignInWithEmailAndPasswordSuccess(user, additionalUserInfo));
  }catch(error){
    console.log("[AuthSagas]", "authSignInWithEmailAndPasswordRequest", "error:", error);
    yield put(AuthActions.authSignInWithEmailAndPasswordFailure(`${error}`));
  }
}

export function * authCreateUserWithEmailAndPasswordRequest (authApi, { email, password, displayName }) {
  try{
    const authResponse = yield call(authApi.createUserWithEmailAndPassword, email, password);
    console.log("[AuthSagas]", "authCreateUserWithEmailAndPasswordRequest", "authResponse:", authResponse);
    const user = JSON.parse(JSON.stringify(authResponse.user));
    const additionalUserInfo = JSON.parse(JSON.stringify(authResponse.additionalUserInfo));
    yield put(AuthActions.authCreateUserWithEmailAndPasswordSuccess(user, additionalUserInfo));
  }catch(error){
    console.log("[AuthSagas]", "authCreateUserWithEmailAndPasswordRequest", "error:", error);
    yield put(AuthActions.authCreateUserWithEmailAndPasswordFailure(`${error}`));
  }
}

export function * authConfirmPasswordResetRequest (authApi, { code, newPassword }) {
  try{
    const passwordResetResponse = yield call(authApi.confirmPasswordReset, code, newPassword);
    console.log("[AuthSagas]", "authConfirmPasswordResetRequest", "passwordResetResponse:", passwordResetResponse);
    const user = JSON.parse(JSON.stringify(passwordResetResponse.user));
    const additionalUserInfo = JSON.parse(JSON.stringify(passwordResetResponse.additionalUserInfo));
    yield put(AuthActions.authConfirmPasswordResetSuccess(user, additionalUserInfo));
  }catch(error){
    console.log("[AuthSagas]", "authConfirmPasswordResetRequest", "error:", error);
    yield put(AuthActions.authConfirmPasswordResetFailure(`${error}`));
  }
}

export function * authSendPasswordResetEmailRequest (authApi, { email, actionCodeSettings }) {
  try{
    const sendPasswordResetEmailResponse = yield call(authApi.sendPasswordResetEmail, email, actionCodeSettings);
    console.log("[AuthSagas]", "authSendPasswordResetEmailRequest", "sendPasswordResetEmailResponse:", sendPasswordResetEmailResponse);
    yield put(AuthActions.authSendPasswordResetEmailSuccess(sendPasswordResetEmailResponse));
  }catch(error){
    console.log("[AuthSagas]", "authSendPasswordResetEmailRequest", "error:", error);
    yield put(AuthActions.authSendPasswordResetEmailFailure(`${error}`));
  }
}

export function * authSignOutRequest (authApi) {
  try{
    const signOutResponse = yield call(authApi.signOut);
    console.log("[AuthSagas]", "authSignOutRequest", "signOutResponse:", signOutResponse);
    yield put(AuthActions.authSignOutSuccess(signOutResponse));
  }catch(error){
    console.log("[AuthSagas]", "authSignOutRequest", "error:", error);
    yield put(AuthActions.authSignOutFailure(`${error}`));
  }
}
