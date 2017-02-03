import React, { PropTypes } from 'react'

import CarAddForm from 'app/containers/CarAddForm'

export default class ParkinglotsWidget extends React.Component {
  render () {
    return (
      <div className='container parkinglot-container'>
        <CarAddForm />
      </div>
    )
  }
}
