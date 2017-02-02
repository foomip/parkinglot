import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import createStore from 'app/store'

const ParkinglotApp = ()=> {
  const store = createStore({})

  return (
    <Provider store={store}>
      <div>App made with Feathers, React, and Webpack</div>
    </Provider>
  )
}

render(<ParkinglotApp />, document.getElementById('app'))
