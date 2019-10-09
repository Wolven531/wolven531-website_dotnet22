import React, { PureComponent } from 'react'
import { Container } from 'reactstrap'

import { NavMenu } from '../NavMenu/NavMenu'

class Layout extends PureComponent {
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
