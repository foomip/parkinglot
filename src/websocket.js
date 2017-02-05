import async from 'async'
import { Set } from 'immutable'

import { getParkinglotIds, fetchKeysFor } from './services/parkinglot/model'
import { getCar } from './services/car/model'

let connectedSockets = new Set([])

function fetchAllCars () {
  return new Promise((resolve, reject)=> {
    getParkinglotIds()
      .then(parkinglotIds => {
        async.map(parkinglotIds, (parkinglotId, next)=> {
          fetchParkingLot(parkinglotId)
            .then(parkinglot => next(null, parkinglot))
            .catch(next)
        }, (err, results)=> {
          if(err) reject(err)
          else {
            resolve(results.reduce((summedLots, parkinglot)=> {
              summedLots[parkinglot.parkinglotId] = parkinglot.cars
              return summedLots
            }, {}))
          }
        })
      })
      .catch(reject)
  })
}

function fetchParkingLot (parkinglotId) {
  return new Promise((resolve, reject)=> {
    fetchKeysFor(parkinglotId)
      .then(carIds => {
        async.map(carIds, (carId, next)=> {
          getCar(carId)
            .then(car => next(null, car))
            .catch(next)
        }, (err, results)=> {
          if(err) reject(err)
          else resolve({
            parkinglotId,
            cars:         results
          })
        })
      })
      .catch(reject)
  })
}

export default io => {
  io.on('connection', socket => {
    connectedSockets = connectedSockets.add(socket)

    socket.on('parkinglots', ()=> {
      fetchAllCars()
        .then(parkinglots => {
          socket.emit('parkinglot:all', parkinglots)
        })
    })
  })
}

export function broadcastParkinglotChanged (parkinglotId) {
  return new Promise((resolve, reject)=> {
    fetchParkingLot(parkinglotId)
      .then(parkingLotData => {
        connectedSockets.forEach(socket => {
          if(socket.connected) socket.emit('parkinglot:changed', parkingLotData)
        })
        resolve()
      })
      .catch(reject)
  })
}

export function broadcastRefreshParkingLots () {
  return new Promise((resolve, reject)=> {
    fetchAllCars()
      .then(parkinglots => {
        connectedSockets.forEach(socket => {
          if(socket.connected) socket.emit('parkinglot:all', parkinglots)
          resolve()
        })
      })
      .catch(reject)
  })
}

// clean out dead connections from connected sockets list
setInterval(()=> connectedSockets = new Set(connectedSockets.filter(socket => socket.connected)), 30000)
