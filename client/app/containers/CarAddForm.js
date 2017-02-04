import { connect } from 'react-redux'

import CarAddFormWidget from 'app/components/CarAddFormWidget'
import { addCarToParkinglot } from 'app/actions'

export default connect(
  ({ $$parkinglotStore }) => ({
    parkinglotIds: $$parkinglotStore.get('parkinglotIds')
  }), {addCarToParkinglot}
)(CarAddFormWidget)
