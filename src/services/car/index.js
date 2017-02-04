import { before, after } from './hooks'
import { createOrUpdateCar } from './model'

export class Service {
  constructor (options) {
    this.options = options || {}
  }

  create (data) {
    return new Promise((resolve, reject)=> {
      createOrUpdateCar(data).then(resolve, reject)
    })
  }
}

export default function () {
  const app = this

  // Initialize our service with any options it requires
  app.use('/cars', new Service())

  // Get our initialize service to that we can bind hooks
  const carService = app.service('/cars')

  // Set up our before hooks
  carService.before(before)

  // Set up our after hooks
  carService.after(after)
}
