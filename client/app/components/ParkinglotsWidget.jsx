import React, { PropTypes } from 'react'

import CarAddForm from 'app/containers/CarAddForm'
import WebsocketClient from 'app/containers/WebsocketClient'
import Parkinglot from 'app/components/Parkinglot'

export default class ParkinglotsWidget extends React.Component {
  static propTypes = {
    parkinglots:      PropTypes.object.isRequired
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
    const { parkinglots } = this.props

    return (
      <div className='container parkinglot-container'>
        <CarAddForm />
        <hr />
        { parkinglots.keySeq().map(key => this.renderParkingLot(key)) }
        <WebsocketClient />
      </div>
    )
  }
}
