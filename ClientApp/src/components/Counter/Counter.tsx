import React, { Component } from 'react'

class Counter extends Component<{}, { currentCount: number }> {
	constructor(props) {
		super(props)
		this.state = { currentCount: 0 }
		this.incrementCounter = this.incrementCounter.bind(this)
	}

	public render() {
		return (
			<div>
				<h1>Counter</h1>
				<p>This is a simple example of a React component.</p>
				<p>Current count: <strong>{this.state.currentCount}</strong></p>
				<button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
			</div>
		)
	}

	private incrementCounter() {
		this.setState({
			currentCount: this.state.currentCount + 1
		})
	}
}

export { Counter }
