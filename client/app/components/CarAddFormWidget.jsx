import React, { PropTypes } from 'react'
import Select from 'react-select'

import 'react-select/dist/react-select.css' // include react select styles

import carBrandNames from 'app/services/carBrandNames'

export default class CarAddFormWidget extends React.Component {
  static propTypes = {
    parkingLotIds:    PropTypes.object.isRequired
  }

  parkinglotOptions () {
    return this.props.parkingLotIds.map(id => ({
      value: id, label: `Parkinglot no. ${id}`})
    ).toArray()
  }

  carBrandOptions () {
    return carBrandNames.map(name => ({value: name, label: name}))
  }

  render () {
    return (
      <div>
        <div className='columns text-center'>
          <div className='col-12'>
            <h5>Add new car to a parkinglot</h5>
          </div>
          <div className='col-3' />
          <div className='col-6'>
            <form className='form-horizontal'>
              <div className='form-group'>
                <div className='col-5 text-right'>
                  <label className='form-label' htmlFor='parkinglot'>
                    Parking lot
                  </label>
                </div>
                <div className='col-7 text-left'>
                  <Select
                    name='parkinglot'
                    options={this.parkinglotOptions()}
                  />
                </div>
              </div>
              <div className='form-group'>
                <div className='col-5 text-right'>
                  <label className='form-label' htmlFor='carBrand'>
                    Car brand name
                  </label>
                </div>
                <div className='col-7 text-left'>
                  <Select
                    name='carBrand'
                    options={this.carBrandOptions()}
                  />
                </div>
              </div>
              <div className='form-group'>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
