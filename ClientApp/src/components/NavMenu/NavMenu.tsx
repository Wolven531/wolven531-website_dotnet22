import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
	Collapse,
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink
} from 'reactstrap'

import './NavMenu.css'

class NavMenu extends Component<{}, { collapsed: boolean }> {
	constructor(props) {
		super(props)

		this.toggleNavbar = this.toggleNavbar.bind(this)
		this.state = {
			collapsed: true
		}
	}

	public render() {
		return (
			<header>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand tag={Link} to="/">wolven531_website_dotnet22</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
							<ul className="navbar-nav flex-grow">
								<NavItem>
									<NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
								</NavItem>
							</ul>
						</Collapse>
					</Container>
				</Navbar>
			</header>
		)
	}

	private toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}
}

export { NavMenu }
