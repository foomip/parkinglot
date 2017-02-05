import React, { PropTypes } from 'react'

import io from 'socket.io-client'

export default class WebsocketClientWidget extends React.Component {
  static propTypes = {
    parkinglotChanged:      PropTypes.func.isRequired,
    parkinglotsRefreshed:   PropTypes.func.isRequired
  }

  componentWillMount() {
    const socket  = io('/')

    socket.on('parkinglot:all', this.props.parkinglotsRefreshed)
    socket.on('parkinglot:changed', this.props.parkinglotChanged)

    socket.emit('parkinglots') // request complete list of all parkinglots to be returned
  }

  render () {
    // TODO: this component doesn't really renderer anything at the moment, but I guess
    // it would be handy to add soemthing here to show the status of the connection to
    // websockets server.
    return null
  }
}
