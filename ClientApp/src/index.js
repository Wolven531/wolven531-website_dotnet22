import 'bootstrap/dist/css/bootstrap.css'

import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'

import { configureStore } from './redux/store/configureStore'

import { AppConnected } from './components/App/App'

import registerServiceWorker from './registerServiceWorker'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const history = createBrowserHistory({ basename: baseUrl })
const rootElement = document.getElementById('root')
const store = configureStore(history)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<AppConnected />
		</ConnectedRouter>
	</Provider>,
	rootElement)

registerServiceWorker()
