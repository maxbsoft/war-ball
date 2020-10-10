import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authSignInAnonymouslyRequest: null,
  authSignInAnonymouslySuccess: ['user', 'additionalUserInfo'],
  authSignInAnonymouslyFailure: ['error'],

  authSignInWithEmailAndPasswordRequest: ['email', 'password'],
  authSignInWithEmailAndPasswordSuccess: ['user', 'additionalUserInfo'],
  authSignInWithEmailAndPasswordFailure: ['error'],

  authCreateUserWithEmailAndPasswordRequest: ['email', 'password', 'displayName'],
  authCreateUserWithEmailAndPasswordSuccess: ['user', 'additionalUserInfo'],
  authCreateUserWithEmailAndPasswordFailure: ['error'],

  authConfirmPasswordResetRequest: ['code', 'newPassword'],
  authConfirmPasswordResetSuccess: ['user', 'additionalUserInfo'],
  authConfirmPasswordResetFailure: ['error'],

  authSendPasswordResetEmailRequest: ['email', 'actionCodeSettings'],
  authSendPasswordResetEmailSuccess: ['resetPasswordResult', 'email'],
  authSendPasswordResetEmailFailure: ['error'],

  authSignOutRequest: null,
  authSignOutSuccess: ['signOutResult'],
  authSignOutFailure: ['error']
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  additionalUserInfo: null,
  fetching: false,
  error: null,
  resetPasswordResult: null,
  signOutResult: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getState: state => state.auth
}

/* ------------- Reducers ------------- */

// authSignInAnonymously
export const authSignInAnonymouslyRequest = (state, {}) => {
  return state.merge({
    fetching: true,
    error: null
  })
}

export const authSignInAnonymouslySuccess = (state, { user, additionalUserInfo }) => {
  return state.merge({
    fetching:false,
    user: user,
    additionalUserInfo: additionalUserInfo,
    error: null
  })
}

export const authSignInAnonymouslyFailure = (state, { error }) => {
  return state.merge({
    fetching:false,
    error: error
  })
}

// authSignInWithEmailAndPassword
export const authSignInWithEmailAndPasswordRequest = (state, { email, password }) => {
  return state.merge({
    fetching: true,
    error: null
  })
}

export const authSignInWithEmailAndPasswordSuccess = (state, { user, additionalUserInfo}) => {
  return state.merge({
    fetching:false,
    user: user,
    additionalUserInfo: additionalUserInfo,
    error: null
  })
}

export const authSignInWithEmailAndPasswordFailure = (state, { error }) => {
  return state.merge({
    fetching:false,
    error: error
  })
}

// authCreateUserWithEmailAndPassword
export const authCreateUserWithEmailAndPasswordRequest = (state, { email, password, displayName }) => {
  return state.merge({
    fetching: true,
    error: null
  })
}

export const authCreateUserWithEmailAndPasswordSuccess = (state, { user, additionalUserInfo }) => {
  return state.merge({
    fetching:false,
    user: user,
    additionalUserInfo: additionalUserInfo,
    error: null
  })
}

export const authCreateUserWithEmailAndPasswordFailure = (state, { error }) => {
  return state.merge({
    fetching:false,
    error: error
  })
}

// authConfirmPasswordReset
export const authConfirmPasswordResetRequest = (state, { code, newPassword }) => {
  return state.merge({
    fetching: true,
    error: null
  })
}

export const authConfirmPasswordResetSuccess = (state, { user, additionalUserInfo }) => {
  return state.merge({
    fetching:false,
    user: user,
    additionalUserInfo: additionalUserInfo,
    error: null,
  })
}

export const authConfirmPasswordResetFailure = (state, { error }) => {
  return state.merge({
    fetching:false,
    error: error
  })
}

// authConfirmPasswordReset
export const authSendPasswordResetEmailRequest = (state, { email, actionCodeSettings }) => {
  return state.merge({
    fetching: true,
    error: null
  })
}

export const authSendPasswordResetEmailSuccess = (state, { resetPasswordResult }) => {
  return state.merge({
    fetching:false,
    resetPasswordResult: resetPasswordResult,
    error: null,
  })
}

export const authSendPasswordResetEmailFailure = (state, { error }) => {
  return state.merge({
    fetching:false,
    error: error
  })
}

// authSignOut
export const authSignOutRequest = (state) => {
  return state.merge({
    fetching: true,
    error: null
  })
}

export const authSignOutSuccess = (state, { signOutResult }) => {
  return state.merge({
    fetching:false,
    signOutResult: signOutResult,
    error: null,
  })
}

export const authSignOutFailure = (state, { error }) => {
  return state.merge({
    fetching:false,
    error: error
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_SIGN_IN_ANONYMOUSLY_REQUEST]: authSignInAnonymouslyRequest,
  [Types.AUTH_SIGN_IN_ANONYMOUSLY_SUCCESS]: authSignInAnonymouslySuccess,
  [Types.AUTH_SIGN_IN_ANONYMOUSLY_FAILURE]: authSignInAnonymouslyFailure,

  [Types.AUTH_SIGN_IN_WITH_EMAIL_AND_PASSWORD_REQUEST]: authSignInWithEmailAndPasswordRequest,
  [Types.AUTH_SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS]: authSignInWithEmailAndPasswordSuccess,
  [Types.AUTH_SIGN_IN_WITH_EMAIL_AND_PASSWORD_FAILURE]: authSignInWithEmailAndPasswordFailure,

  [Types.AUTH_CREATE_USER_WITH_EMAIL_AND_PASSWORD_REQUEST]: authCreateUserWithEmailAndPasswordRequest,
  [Types.AUTH_CREATE_USER_WITH_EMAIL_AND_PASSWORD_SUCCESS]: authCreateUserWithEmailAndPasswordSuccess,
  [Types.AUTH_CREATE_USER_WITH_EMAIL_AND_PASSWORD_FAILURE]: authCreateUserWithEmailAndPasswordFailure,

  [Types.AUTH_CONFIRM_PASSWORD_RESET_REQUEST]: authConfirmPasswordResetRequest,
  [Types.AUTH_CONFIRM_PASSWORD_RESET_SUCCESS]: authConfirmPasswordResetSuccess,
  [Types.AUTH_CONFIRM_PASSWORD_RESET_FAILURE]: authConfirmPasswordResetFailure,

  [Types.AUTH_SEND_PASSWORD_RESET_EMAIL_REQUEST]: authSendPasswordResetEmailRequest,
  [Types.AUTH_SEND_PASSWORD_RESET_EMAIL_SUCCESS]: authSendPasswordResetEmailSuccess,
  [Types.AUTH_SEND_PASSWORD_RESET_EMAIL_FAILURE]: authSendPasswordResetEmailFailure,

  [Types.AUTH_SIGN_OUT_REQUEST]: authSignOutRequest,
  [Types.AUTH_SIGN_OUT_SUCCESS]: authSignOutSuccess,
  [Types.AUTH_SIGN_OUT_FAILURE]: authSignOutFailure,
})
