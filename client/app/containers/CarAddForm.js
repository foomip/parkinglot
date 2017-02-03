import { connect } from 'react-redux'

import CarAddFormWidget from 'app/components/CarAddFormWidget'

export default connect(
  ({ $$parkinglotStore }) => ({
    parkingLotIds: $$parkinglotStore.get('parkingLotIds')
  }), {}
)(CarAddFormWidget)
