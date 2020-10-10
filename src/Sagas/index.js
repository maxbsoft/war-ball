import { takeLatest, takeEvery, all, fork } from 'redux-saga/effects'
import authApi from '../Services/AuthApi'
import api from '../Services/Api'

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'

/* ------------- Sagas ------------- */
import {
  startup
} from './StartupSagas'

import {
  authSignInAnonymouslyRequest,
  authSignInWithEmailAndPasswordRequest,
  authCreateUserWithEmailAndPasswordRequest,
  authConfirmPasswordResetRequest,
  authSendPasswordResetEmailRequest,
  authSignOutRequest
} from './AuthSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api, authApi),
    
    takeLatest(AuthTypes.AUTH_SIGN_IN_ANONYMOUSLY_REQUEST, authSignInAnonymouslyRequest, authApi),
    takeLatest(AuthTypes.AUTH_SIGN_IN_WITH_EMAIL_AND_PASSWORD_REQUEST, authSignInWithEmailAndPasswordRequest, authApi),
    takeLatest(AuthTypes.AUTH_CREATE_USER_WITH_EMAIL_AND_PASSWORD_REQUEST, authCreateUserWithEmailAndPasswordRequest, authApi),
    takeLatest(AuthTypes.AUTH_CONFIRM_PASSWORD_RESET_REQUEST, authConfirmPasswordResetRequest, authApi),
    takeLatest(AuthTypes.AUTH_SEND_PASSWORD_RESET_EMAIL_REQUEST, authSendPasswordResetEmailRequest, authApi),
    takeLatest(AuthTypes.AUTH_SIGN_OUT_REQUEST, authSignOutRequest, authApi)
  ])
}
