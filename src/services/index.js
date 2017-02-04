import parkinglot from './parkinglot'
import car from './car'
import calculator from './calculator'
import inventory from './inventory'

export default function() {
  const app = this

  app.use('/parkinglots/:parkinglotId/cars/:hours', calculator)
  app.use('/inventory/:hours', inventory)
  app.configure(parkinglot)
  app.configure(car)
}
