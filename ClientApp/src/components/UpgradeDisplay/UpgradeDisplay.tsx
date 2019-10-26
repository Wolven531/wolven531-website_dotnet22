// import React, { FC, memo } from "react"
import React, { PureComponent } from "react"

interface IUpgradeDisplayProps {
	disabled: boolean
	displayText: string
	onUpgrade: () => void
}

class UpgradeDisplay extends PureComponent<IUpgradeDisplayProps> {
	public render() {
		// console.info(`[ render | UpgradeDisplay] `)

		return (
			<button className="upgrade"
				disabled={this.props.disabled}
				onClick={() => { this.props.onUpgrade() }}>
					{this.props.displayText}
			</button>
		)
	}
}

// const UpgradeDisplay: FC<{
// 	disabled: boolean
// 	displayText: string
// 	onUpgrade: () => void
// }> = memo((props) => {
// 	// console.info(`[ render | UpgradeDisplay] `)

// 	return (
// 		<button className="upgrade"
// 			disabled={props.disabled}
// 			onClick={() => { props.onUpgrade() }}>
// 				{props.displayText}
// 		</button>
// 	)
// })

export { UpgradeDisplay }
