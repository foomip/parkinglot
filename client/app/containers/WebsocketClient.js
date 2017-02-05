import { connect } from 'react-redux'

import WebsocketClientWidget from 'app/components/WebsocketClientWidget'
import { parkinglotsRefreshed, parkinglotChanged } from 'app/actions'

export default connect(
  ()=> ({}), {parkinglotsRefreshed, parkinglotChanged}
)(WebsocketClientWidget)
