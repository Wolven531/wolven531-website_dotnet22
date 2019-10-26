import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import { appActions } from '../../redux/actions/appActions'

//import { Counter } from '../Counter/Counter'
// import { FetchData } from '../FetchData/FetchData'
import { Home } from '../Home/Home'
import { InfoDisplay } from '../InfoDisplay/InfoDisplay'
import { Layout } from '../Layout/Layout'
import { ResourceControls } from '../ResourceControls/ResourceControls'

class App extends Component {
	public componentDidMount() {
		window.document.title = 'Wolven531 Web'
		/*
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrer: 'no-referrer', // no-referrer, *client
		 */
		fetch('/api/Info', {
			cache: 'no-cache',
			credentials: 'same-origin',
			method: 'post'
		} as RequestInit)
			.then(() => {
				console.info(`[ componentDidMount | App ] pinged for unique page hit`)
			})
			.catch(err => console.error(`An error ocurred`, err))
	}

	public render() {
		return (
			<Layout>
				<Route exact path='/' component={Home} />
				{/*<Route path='/counter' component={Counter} />*/}
				{/* <Route path='/fetch-data' component={FetchData} /> */}
				<Route path='/resources' component={ResourceControls} />
				<Route path='/info' component={InfoDisplay} />
			</Layout>
		)
	}
}

const mapStateToProps = (state) => {
	return { }
}

const mapDispatchToProps = {
	...appActions
}

const AppConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

export { App, AppConnected }
