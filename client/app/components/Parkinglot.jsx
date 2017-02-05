import React, { PropTypes } from 'react'
import moment from 'moment'
import { Range } from 'immutable'

import ParkingBay from 'app/components/ParkingBay'

export default class Parkinglot extends React.Component {
  static propTypes = {
    parkinglotId:       PropTypes.number.isRequired,
    parkinglot:         PropTypes.array.isRequired
  }

  parkingBays () {
    const bays              = this.props.parkinglot.map((car, index) => ({
      id:           index,
      occupied:     true,
      brand:        car.brand,
      licenseplate: car.licenseplate,
      parkingTime:  moment(car.parkingtime).utcOffset(car.parkingtime)
    }))
    const unoccupiedBaysCnt = 23 - bays.length
    const unoccupiedBays    = Range(0, unoccupiedBaysCnt).map((_, index)=> ({
      id:       index + bays.length,
      occupied: false
    })).toArray()

    return bays.concat(unoccupiedBays)
  }

  render () {
    return (
      <div className='columns text-center'>
        <div className='col-12'>
          <h4>
            Parkinglot ID <strong>{this.props.parkinglotId}</strong>
          </h4>
        </div>
        <div className='col-12'>
          {
            this.parkingBays().map(bay => <ParkingBay key={bay.id} parkingBay={bay} />)
          }
        </div>
      </div>
    )
  }
}
