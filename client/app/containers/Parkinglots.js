import { connect } from 'react-redux'

import ParkinglotsWidget from 'app/components/ParkinglotsWidget'

export default connect(
  ({ $$parkinglotStore }) => ({
    parkinglots:      $$parkinglotStore.get('parkinglots')
  }), {}
)(ParkinglotsWidget)
