import React, { FC, memo } from "react"

const UpgradeDisplay: FC<{
	disabled: boolean
	displayText: string
	onUpgrade: () => void
}> = memo((props) => {
	// console.info(`[ render | UpgradeDisplay] `)

	return (
		<button className="upgrade"
			disabled={props.disabled}
			onClick={() => { props.onUpgrade() }}>
				{props.displayText}
		</button>
	)
})

export { UpgradeDisplay }
