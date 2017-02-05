import axios from 'axios'
import moment from 'moment'

import actionTypes from 'app/constants'

export function addCarToParkinglot ({licensePlateNumber, carBrandName, parkinglotId, onAdded}) {
  return dispatch => {
    const data = {
      brand:          carBrandName,
      licenseplate:   licensePlateNumber,
      parkinglotid:   parkinglotId,
      parkingtime:    moment().utc().format('YYYY-MM-DDTHH:mm:ssZ')
    }

    axios.post('/cars', data)
      .then(response => {
        onAdded()
        dispatch({type: actionTypes.CAR_ADDED, data: response.data})
      })
      .catch(err => dispatch({type: actionTypes.CAR_ADD_FAILED, error: err}))
  }
}

export function parkinglotsRefreshed (parkinglots) {
  return {type: actionTypes.PARKINGLOTS_REFRESHED, parkinglots}
}

export function parkinglotChanged (parkinglot) {
  return {type: actionTypes.PARKINGLOT_CHANGED, ...parkinglot}
}
