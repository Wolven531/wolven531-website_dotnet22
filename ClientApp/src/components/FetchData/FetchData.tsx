import React, { Component } from 'react'

class FetchData extends Component<{}, { loading: boolean, forecasts: any[] }> {
	constructor(props) {
		super(props)
		this.state = { forecasts: [], loading: true }

		fetch('api/SampleData/WeatherForecasts')
			.then(response => response.json())
			.then(data => {
				this.setState({ forecasts: data, loading: false })
			})
	}

	public render() {
		return (
			<div>
				<h1>Weather forecast</h1>
				<p>This component demonstrates fetching data from the server.</p>
				{this.state.loading
					? <p><em>Loading...</em></p>
					: <table className='table table-striped'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Temp. (C)</th>
								<th>Temp. (F)</th>
								<th>Summary</th>
							</tr>
						</thead>
						<tbody>
							{this.state.forecasts.map(forecast =>
								<tr key={forecast.dateFormatted}>
									<td>{forecast.dateFormatted}</td>
									<td>{forecast.temperatureC}</td>
									<td>{forecast.temperatureF}</td>
									<td>{forecast.summary}</td>
								</tr>
							)}
						</tbody>
					</table>
				}
			</div>
		)
	}
}

export { FetchData }
