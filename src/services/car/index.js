import { fetchKeysFor } from '../parkinglot/model'
import { calculateCostsFor } from './model'

export default {
  find ({ parkinglotId, hours }) {
    return new Promise((resolve, reject)=> {
      fetchKeysFor(parkinglotId)
        .then(carIds => {
          return calculateCostsFor(carIds, hours)
        })
        .then(resolve)
        .catch(reject)
    })
  }
}
