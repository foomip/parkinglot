import { Map, List } from 'immutable'

import actionTypes from 'app/constants'

const $$initialParkinglotState = Map({
  parkinglotIds:    List()
})

function parkinglotReducer ($$state=$$initialParkinglotState, action={}) {
  switch(action.type) {
  case actionTypes.CAR_ADDED:       return $$state
  case actionTypes.CAR_ADD_FAILED:
    console.error(action.error) // eslint-disable-line no-console
    alert('Sorry, something went wrong with the system. Please refresh your web page')
    return $$state
  default:
    return $$state
  }
}

export default {
  $$parkinglotStore: parkinglotReducer
}

export const initialStates = {
  $$parkinglotState: $$initialParkinglotState
}
