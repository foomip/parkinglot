import React, { PropTypes } from 'react'

import CarAddForm from 'app/containers/CarAddForm'
import WebsocketClient from 'app/containers/WebsocketClient'
import Parkinglot from 'app/components/Parkinglot'

export default class ParkinglotsWidget extends React.Component {
  static propTypes = {
    parkinglots:      PropTypes.object.isRequired
  }

  renderParkingLots () {
    const { parkinglots } = this.props

    if(parkinglots.length === 0)
      return (
        <div className='text-center'>
          <p>(no parking lots heave been created, add a car to start seeing things here)</p>
        </div>
      )
    else
      return parkinglots.keySeq().map(key => this.renderParkingLot(key))
  }

  renderParkingLot (parkinglotId) {
    const parkinglot = this.props.parkinglots.get(parkinglotId)

    return <Parkinglot
      key={parkinglotId}
      parkinglot={parkinglot}
      parkinglotId={parseInt(parkinglotId, 10)}
    />
  }

  render () {
    return (
      <div className='container parkinglot-container'>
        <CarAddForm />
        <hr />
        <div className='text-center'>
          <h5>Having a little fun here, parkinglots information is updated real-time via websockets :)</h5>
        </div>
        {this.renderParkingLots()}
        <WebsocketClient />
      </div>
    )
  }
}
