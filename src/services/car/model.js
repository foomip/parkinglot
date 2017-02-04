import levelup from 'levelup'
import memdown from 'memdown'
import moment from 'moment'
import async from 'async'

import parkinglotOpenAt from '../parkinglotOpenAt'
import { assignCarToParkinglot, unassignCarFromParkingLot } from '../parkinglot/model'

const db                  = levelup(memdown)
const hourlyCostCents     = 120
const hourlyDiscountCents = 10

function validParkingTime (parkingTimeStr) {
  const parkingTime = moment(parkingTimeStr).utcOffset(parkingTimeStr)

  return parkingTime.isSameOrAfter(parkinglotOpenAt)
}

function calculateCosts (parkingTime, currentTime) {
  // calculate number of hours a car has been parked, up to the
  // closest full hour
  const secondsParked     = currentTime.unix() - parkingTime.unix()
  const fullHoursParked   = Math.floor(secondsParked / (60 * 60))
  const costCents         = fullHoursParked * hourlyCostCents
  const discountCents     = fullHoursParked > 3 ? (fullHoursParked - 3) * hourlyDiscountCents : 0
  const costAfterDiscount = costCents - discountCents

  return {
    costCents: costAfterDiscount > 0 ? costAfterDiscount : 0,
    discountCents
  }
}

export function createCar(data) {
  return new Promise((resolve, reject)=> {
    if(validParkingTime(data.parkingtime)) {
      const id = data.licenseplate

      db.put(id, JSON.stringify(data), err => {
        if(err) reject(err)
        else resolve(id)
      })
    }
    else reject(new Error(`Car record with licenseplate ${data.licenseplate} has an invalid parkingtime`))
  })
}

export function createOrUpdateCar(data) {
  return new Promise((resolve, reject)=> {
    getCar(data.licenseplate)
      .then((existingCar)=> {
        unassignCarFromParkingLot(existingCar.parkinglotid, existingCar.licenseplate)
          .then(()=> assignCarToParkinglot(data.parkinglotid, data.licenseplate))
          .then(()=> createCar(data))
          .then(()=> resolve(data))
          .catch(reject)
      })
      .catch(err => {
        if(err.notFound) {
          assignCarToParkinglot(data.parkinglotid, data.licenseplate)
            .then(()=> createCar(data))
            .then(()=> resolve(data))
            .catch(reject)
        }
        else reject(err)
      })
  })
}

export function getCar(id) {
  return new Promise((resolve, reject)=> {
    db.get(id, (err, car)=> {
      if(err) reject(err)
      else resolve(JSON.parse(car))
    })
  })
}

export function calculateCostsFor (carIds, hours) {
  return new Promise((resolve, reject)=> {
    const timeToCheck = parkinglotOpenAt.clone().add(hours, 'hours')

    async.map(carIds, (carId, next)=> {
      getCar(carId)
        .then(car => {
          const parkingTime                   = moment(car.parkingtime).utcOffset(car.parkingtime)
          const { costCents, discountCents }  = calculateCosts(parkingTime, timeToCheck)

          next(null, {
            brand:          car.brand,
            licensePlate:   car.licenseplate,
            parkingTime:    car.parkingtime,
            value:          costCents / 100,
            discountCents
          })
        })
        .catch(next)
    }, (err, results)=> {
      if(err) reject(err)
      else    resolve(results)
    })
  })
}
