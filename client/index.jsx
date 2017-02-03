import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createStore from 'app/store'
import Parkinglots from 'app/containers/Parkinglots'

const ParkinglotApp = ()=> {
  const store = createStore({})

  return (
    <Provider store={store}>
      <Parkinglots />
    </Provider>
  )
}

render(<ParkinglotApp />, document.getElementById('app'))
