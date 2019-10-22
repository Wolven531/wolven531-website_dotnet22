import React, { PureComponent } from 'react'

class Home extends PureComponent {
	public componentDidMount() {
		window.document.title = 'Home - Wolven531 Web'
	}

	public render() {
		return (
			<div>
				<h1>Hello, person!</h1>
			</div>
		)
	}
}

export { Home }
