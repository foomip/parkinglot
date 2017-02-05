import React, { PropTypes } from 'react'
import Select from 'react-select'
import clone from 'clone'

import 'react-select/dist/react-select.css' // include react select styles

import carBrandNames from 'app/services/carBrandNames'

export default class CarAddFormWidget extends React.Component {
  static propTypes = {
    parkinglotIds:      PropTypes.object.isRequired,

    addCarToParkinglot: PropTypes.func.isRequired
  }

  initialState = {
    parkinglotId:       { error: null, val: '' },
    carBrandName:       { error: null, val: '' },
    licensePlateNumber:  { error: null, val: '' },
    adding:             false,
    savePressed:        false
  }

  constructor (props) {
    super(props)

    this.state = clone(this.initialState)
  }

  addCarToParkinglot = ()=> {
    const { parkingLotValid, carBrandNameValid, licensePlateNumberValid, adding } = this.validateForm()

    if(!adding) {
      this.setState({savePressed: true})

      if(parkingLotValid && carBrandNameValid && licensePlateNumberValid) {
        const { parkinglotId, carBrandName, licensePlateNumber } = this.state

        this.setState({adding: true})
        this.props.addCarToParkinglot({
          parkinglotId:       parkinglotId.val,
          carBrandName:       carBrandName.val,
          licensePlateNumber: licensePlateNumber.val,
          onAdded:            ()=> {
            this.setState(clone(this.initialState))
          }
        })
      }
      else this.updateFormValidations()
    }
  }

  parkingLotChanged = (event)=> {
    const parkinglotId = clone(this.state.parkinglotId)

    parkinglotId.val = event.target.value

    this.setState({parkinglotId})
  }

  carBrandNameChanged = ({value})=> {
    const carBrandName = clone(this.state.carBrandName)

    carBrandName.val = value

    this.setState({carBrandName})
  }

  licensePlateNumberChanged = (event)=> {
    const licensePlateNumber = clone(this.state.licensePlateNumber)

    licensePlateNumber.val = event.target.value

    this.setState({licensePlateNumber})
  }

  updateFormValidations = ()=> {
    const parkinglotId        = clone(this.state.parkinglotId)
    const carBrandName        = clone(this.state.carBrandName)
    const licensePlateNumber   = clone(this.state.licensePlateNumber)
    const { parkingLotValid, carBrandNameValid, licensePlateNumberValid } = this.validateForm()

    if(!parkingLotValid) parkinglotId.error = 'Number ID id required (eg. 1, 3, etc.)'
    else parkinglotId.error = null

    if(!carBrandNameValid) carBrandName.error = 'Required field'
    else carBrandName.error = null

    if(!licensePlateNumberValid) licensePlateNumber.error = 'Required field in the following format: 12-AB-34'
    else licensePlateNumber.error = null

    this.setState({parkinglotId, carBrandName, licensePlateNumber})
  }

  validateForm () {
    return {
      parkingLotValid:        this.parkingLotValid(),
      carBrandNameValid:      this.carBrandNameValid(),
      licensePlateNumberValid: this.licensePlateNumberValid()
    }
  }

  parkingLotValid () {
    const { parkinglotId } = this.state

    return parkinglotId.val != null && /^\d+$/.test(parkinglotId.val)
  }

  carBrandNameValid () {
    return this.state.carBrandName.val != null && this.state.carBrandName.val.trim() != ''
  }

  licensePlateNumberValid () {
    const { licensePlateNumber } = this.state

    return licensePlateNumber != null && /^\d+\-[a-z]+\-\d+$/i.test(licensePlateNumber.val)
  }

  parkinglotOptions () {
    return this.props.parkinglotIds.map(id => ({
      value: id, label: `Parkinglot no. ${id}`})
    ).toArray()
  }

  carBrandOptions () {
    return carBrandNames.map(name => ({value: name, label: name}))
  }

  render () {
    const { adding, parkinglotId, carBrandName, licensePlateNumber, savePressed } = this.state

    return (
      <div>
        <div className='columns text-center'>
          <div className='col-12'>
            <h5>Add a car to a parkinglot</h5>
          </div>
          <div className='col-3' />
          <div className='col-6'>
            <form className='form-horizontal'>
              <div className='form-group'>
                <div className='col-5 text-right'>
                  <label className='form-label' htmlFor='parkinglotId'>
                    Parking lot ID
                  </label>
                </div>
                <div className='col-7 text-left'>
                  <input
                    type='text'
                    id='parkinglotId'
                    name='parkinglotId'
                    className='form-input'
                    value={parkinglotId.val}
                    onChange={this.parkingLotChanged}
                    onBlur={ ()=> savePressed && this.updateFormValidations() }
                    placeholder='Enter a new or exisiting parkinglot ID'
                  />
                  {
                    parkinglotId.error &&
                    <p style={{color: 'red'}} className='form-input-hint'>{parkinglotId.error}</p>
                  }
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
                    value={carBrandName.val}
                    options={this.carBrandOptions()}
                    onChange={this.carBrandNameChanged}
                    onBlur={ ()=> savePressed && this.updateFormValidations() }
                  />
                  {
                    carBrandName.error &&
                    <p style={{color: 'red'}} className='form-input-hint'>{carBrandName.error}</p>
                  }
                </div>
              </div>
              <div className='form-group'>
                <div className='col-5 text-right'>
                  <label className='form-label' htmlFor='licensePlate'>
                    License plate number
                  </label>
                </div>
                <div className='col-7 text-left'>
                  <input
                    type='text'
                    id='licensePlate'
                    name='licensePlate'
                    className='form-input'
                    value={licensePlateNumber.val}
                    onChange={this.licensePlateNumberChanged}
                    onBlur={ ()=> savePressed && this.updateFormValidations() }
                  />
                  {
                    licensePlateNumber.error &&
                    <p style={{color: 'red'}} className='form-input-hint'>{licensePlateNumber.error}</p>
                  }
                </div>
              </div>
              <div className='form-group'>
                <div className='col-5' />
                <div className='col-7 text-left'>
                  <a className={`btn btn-primary${adding ? ' loading' : ''}`} onClick={this.addCarToParkinglot}>
                    <i className='fa fa-plus-circle' /> Add
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
