import React, { PropTypes } from 'react'
import capitalize from 'capitalize'

import 'app/stylesheets/ParkingBay.sass' // related stylesheet

export default class ParkingBay extends React.Component {
  static propTypes = {
    parkingBay:         PropTypes.object.isRequired
  }

  tooltipInfo () {
    const { parkingBay } = this.props
    const format = 'HH[H]mm'
    const { brand, licenseplate, parkingTime } = parkingBay

    return `${capitalize(brand)} - ${licenseplate}, arrived ${parkingTime.format(format)}`
  }

  render () {
    const { parkingBay } = this.props
    const bayId = parkingBay.id + 1

    if(parkingBay.occupied) {
      return (
        <span
          className='label label-danger parkingbay parkingbay-occupied tooltip'
          data-tooltip={this.tooltipInfo()}
        >
          {bayId} <i className='fa fa-car'/>
        </span>
      )
    }
    else {
      return (
        <span className='label label-success parkingbay parkingbay-open'>
          {bayId}
        </span>
      )
    }
  }
}
