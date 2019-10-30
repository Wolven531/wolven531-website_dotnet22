import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { IApplicationState, reducers } from './'

const configureStore = (history: History, initialState?: IApplicationState) => {
	const middleware = [
		thunk,
		routerMiddleware(history)
	]

	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(history)
	})

	const enhancers: any[] = []
	const windowIfDefined = typeof window === 'undefined' ? null : window as any
	if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
		enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__())
	}

	return createStore(
		rootReducer,
		initialState,
		compose(applyMiddleware(...middleware), ...enhancers)
	)
}

export { configureStore }
