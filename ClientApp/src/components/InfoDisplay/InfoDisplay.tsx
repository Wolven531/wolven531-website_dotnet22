import React, { Component } from 'react'

class InfoDisplay extends Component<{}, { data: any, loading: boolean }> {
	constructor(props) {
		super(props)
		this.state = { data: null, loading: true }

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
				{this.state.loading
					? <p>Loading...</p>
					: <section>
						<p>{(JSON.stringify(this.state.data, null, 4))}</p>
					</section>
				}
			</article>
		)
	}
}

export { InfoDisplay }
