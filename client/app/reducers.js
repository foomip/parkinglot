import { Map, List } from 'immutable'

import actionTypes from 'app/constants'

const $$initialParkinglotState = Map({
  parkinglotIds:    List(),
  parkinglots:      Map()
})

function parkinglotChanged($$state, {parkinglotId, cars}) {
  const $$parkinglots = $$state.get('parkinglots')
  return $$state.set('parkinglots', $$parkinglots.set(parkinglotId.toString(), cars))
}

function parkinglotReducer ($$state=$$initialParkinglotState, action={}) {
  switch(action.type) {
  case actionTypes.CAR_ADDED:               return $$state
  case actionTypes.CAR_ADD_FAILED:
    console.error(action.error) // eslint-disable-line no-console
    alert('Sorry, something went wrong with the system. Please refresh your web page')
    return $$state
  case actionTypes.PARKINGLOTS_REFRESHED:
    return $$state.set('parkinglots', Map(action.parkinglots))
  case actionTypes.PARKINGLOT_CHANGED:      return parkinglotChanged($$state, action)
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
