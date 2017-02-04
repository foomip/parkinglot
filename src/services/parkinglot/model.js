import levelup from 'levelup'
import memdown from 'memdown'
import { Set } from 'immutable'

const db = levelup(memdown)

export function fetchKeysFor (parkinglotId) {
  return new Promise((resolve, reject)=> {
    db.get(`parkinglot_${parkinglotId}`, (err, keys)=> {
      if(err) {
        if(err.notFound) resolve([])
        else reject(err)
      }
      else resolve(JSON.parse(keys))
    })
  })
}

export function assignCarToParkinglot (parkinglotId, carId) {
  return new Promise((resolve, reject)=> {
    fetchKeysFor(parkinglotId)
      .then(keys => {
        if(keys.length >= 23) reject(new Error(`Maximum number of cars reached for parking lot ${parkinglotId}`))
        const uniqueKeys = new Set(keys).add(carId)

        db.put(`parkinglot_${parkinglotId}`, JSON.stringify(uniqueKeys.toJS()), err => {
          if(err) reject(err)
          else resolve()
        })
      })
      .catch(reject)
  })
}

export function unassignCarFromParkingLot (parkinglotId, carId) {
  return new Promise((resolve, reject)=> {
    fetchKeysFor(parkinglotId)
      .then(keys => {
        const filteredKeys = keys.filter(key => key !== carId)

        db.put(`parkinglot_${parkinglotId}`, JSON.stringify(filteredKeys), err => {
          if(err) reject(err)
          else resolve()
        })
      })
  })
}

export function getParkinglotIds () {
  return new Promise((resolve, reject)=> {
    const keys = []

    db.createKeyStream()
      .on('data', key => {
        if(/^parkinglot\_\d+$/.test(key)) keys.push(parseInt(key.substr(11), 10))
      })
      .on('error', err => reject(err))
      .on('close', ()=> resolve(keys))
  })
}
