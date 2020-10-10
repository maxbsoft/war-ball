import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '0.1',
  storeConfig: {
    key: 'war-ball',
    storage: storage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['startup'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers'
    // whitelist: [],
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
