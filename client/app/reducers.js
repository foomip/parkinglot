import { Map } from 'immutable'

import actionTypes from 'app/constants'

const $$initialParkinglotState = Map({})

function parkinglotReducer ($$state=$$initialParkinglotState, action={}) {
  switch(action.type) {
  case actionTypes.PARKINGLOT_CHANGED:    return $$state
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
