import React, { Component } from 'react'
import { Route } from 'react-router'

import { Counter } from '../Counter/Counter'
import { FetchData } from '../FetchData/FetchData'
import { Home } from '../Home/Home'
import { InfoDisplay } from '../InfoDisplay/InfoDisplay'
import { Layout } from '../Layout/Layout'

class App extends Component {
	public render() {
		return (
			<Layout>
				<Route exact path='/' component={Home} />
				<Route path='/counter' component={Counter} />
				<Route path='/fetch-data' component={FetchData} />
				<Route path='/info' component={InfoDisplay} />
			</Layout>
		)
	}
}

export { App }
