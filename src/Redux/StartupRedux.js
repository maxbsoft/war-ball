import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  startupSuccess: null,
  startupNavReady: null,
  startupUpdateProgress: ['progress']
})

export const StartupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  success: false,
  progress: 0,
  error:null
})

export const startup = (state: Object) => {
  return state.merge({ success:false, error:null })
}

export const startupSuccess = (state: Object) => {
  return state.merge({ success:true, error:null })
}

export const startupFailure = (state: Object, { error }: Object) =>{
  return state.merge({ success: false, error })
}

export const startupUpdateProgress = (state: Object, { progress }: Object) => {
  return state.merge({ progress: progress });
}

export const startupNavReady = (state: Object) => {
  return state;
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.STARTUP_SUCCESS]: startupSuccess,
  [Types.STARTUP_NAV_READY]: startupNavReady,
  [Types.STARTUP_UPDATE_PROGRESS]: startupUpdateProgress
})
