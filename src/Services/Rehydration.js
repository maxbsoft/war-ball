import ReduxPersist from '../Config/ReduxPersist'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import StartupActions from '../Redux/StartupRedux'

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startup = () => {
    console.log("pre startup")
    store.dispatch(StartupActions.startup())
  }

  // Check to ensure latest reducer version
  storage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, null, ()=>{
        startup()
      }).purge()
      storage.setItem('reducerVersion', reducerVersion)

    } else {
      persistStore(store,null, ()=>{
        startup()
      })
    }

  }).catch((e) => {
    persistStore(store, null, ()=>{
      startup();
    })
    storage.setItem('reducerVersion', reducerVersion)
  })
}

export default { updateReducers }
