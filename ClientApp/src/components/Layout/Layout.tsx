import React, { Component } from 'react'
import { Container } from 'reactstrap'

import { NavMenu } from '../NavMenu/NavMenu'

class Layout extends Component {
	public render() {
		return (
			<div>
				<NavMenu />
				<Container>
					{this.props.children}
				</Container>
			</div>
		)
	}
}

export { Layout }
