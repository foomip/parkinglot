import async from 'async'

import { getParkingLotIds, fetchKeysFor } from '../parkinglot/model'
import { calculateCostsFor } from '../car/model'
import summariseCosts from './summariseCosts'

export default {
  find({ hours }) {
    return new Promise((resolve, reject)=> {
      getParkingLotIds()
        .then(parkinglotIds => {
          async.map(parkinglotIds, (parkinglotId, next)=> {
            fetchKeysFor(parkinglotId)
              .then(carIds => calculateCostsFor(carIds, hours))
              .then(costs => next(null, costs))
              .catch(next)
          }, (err, costsData)=> {
            if(err) reject(err)
            else resolve(summariseCosts(costsData))
          })
        })
        .catch(reject)
    })
  }
}
