import async from 'async'
import { BadRequest } from 'feathers-errors'

import { before, after } from './hooks'
import { createCar } from '../car/model'
import { assignCarToParkinglot } from './model'

export class Service {
  constructor(options) {
    this.options = options || {}
  }

  create(data) {
    if(data.cars && data.cars.car) {
      return new Promise((resolve, reject)=> {
        async.eachSeries(data.cars.car, (carData, next)=> {
          createCar(carData.$)
            .then(id => assignCarToParkinglot(carData.$.parkinglotid, id))
            .then(next)
            .catch(next)
        }, (err)=> {
          if(err) reject(err)
          else    resolve({status: 'success', description: 'request processed successfully'})
        })
      })
    }
    else Promise.reject(new BadRequest('Data received not in a valid format'))
  }
}

export default function () {
  const app = this

  // Initialize our service with any options it requires
  app.use('/parkinglots', new Service())

  // Get our initialize service to that we can bind hooks
  const parkinglotService = app.service('/parkinglots')

  // Set up our before hooks
  parkinglotService.before(before)

  // Set up our after hooks
  parkinglotService.after(after)
}
