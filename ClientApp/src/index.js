import 'bootstrap/dist/css/bootstrap.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { configureStore } from './redux/store/configureStore'

import { AppConnected } from './components/App/App'

import registerServiceWorker from './registerServiceWorker'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const rootElement = document.getElementById('root')
const store = configureStore

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename={baseUrl}>
			<AppConnected />
		</BrowserRouter>
	</Provider>,
	rootElement)

registerServiceWorker()
