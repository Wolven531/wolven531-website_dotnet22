import React, { Component } from 'react'

import { ServerInfo } from '../../models/ServerInfo'

class InfoDisplay extends Component<{}, { data?: ServerInfo, loading: boolean }> {
	constructor(props) {
		super(props)
		this.state = { loading: true }

		fetch('api/health')
			.then(response => response.json())
			.then(data => {
				this.setState({ data, loading: false })
			})
	}

	public render() {
		return (
			<article>
				<h2>Server Info</h2>
				{this.state.loading || !this.state.data
					? <p>Loading...</p>
					: <section>
						<ul>
							<li>Healthy: {String(this.state.data.healthy)}</li>
							<li>Startup time: {this.state.data.startupTime}</li>
						</ul>
					</section>
				}
			</article>
		)
	}
}

export { InfoDisplay }
