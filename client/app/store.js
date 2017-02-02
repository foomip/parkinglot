import { compose, createStore, applyMiddleware, combineReducers } from 'redux'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers, { initialStates } from 'app/reducers'

const logger = createLogger()

export default function (props) {
  const { $$parkinglotState } = initialStates

  const initialState = {
    $$parkinglotStore:  $$parkinglotState.merge(props)
  }

  const reducer       = combineReducers(reducers)
  const composedStore = compose( applyMiddleware(thunkMiddleware, logger) )
  const storeCreator  = composedStore(createStore)
  const store         = storeCreator(reducer, initialState)

  return store
}
