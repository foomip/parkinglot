import axios from 'axios'
import moment from 'moment'

import actionTypes from 'app/constants'

export function addCarToParkinglot ({licensePlateNumber, carBrandName, parkinglotId, onAdded}) {
  return dispatch => {
    const data = {
      brand:          carBrandName,
      licenseplate:   licensePlateNumber,
      parkingotid:    parkinglotId,
      parkingtime:    moment().utc().format('YYYY-MM-DDTHH:mm:ssZ')
    }

    console.log(data);

    axios.post('/cars', data)
      .then(response => {
        dispatch({type: actionTypes.CAR_ADDED, data: response.data})
        onAdded()
      })
      .catch(err => dispatch({type: actionTypes.CAR_ADD_FAILED, error: err}))
  }
}
