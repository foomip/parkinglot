import parkinglot from './parkinglot'
import car from './car'
import inventory from './inventory'

export default function() {
  const app = this

  app.use('/parkinglots/:parkinglotId/cars/:hours', car)
  app.use('/inventory/:hours', inventory)
  app.configure(parkinglot)
}
