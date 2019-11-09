import React, { FC, memo, useEffect } from 'react'
import { connect } from 'react-redux'

import { useInterval } from '../../hooks/useInterval'

import { Unit } from '../../models/Unit'

import { IApplicationState } from '../../redux/store'

import { AutoSave as AutoSaveModel } from '../../models/AutoSave'

interface IAutoSaveProps {
	food: number
	money: number
	stone: number
	units: Unit[]
	wood: number
}

const AutoSaveUnconnected: FC<IAutoSaveProps> = (props) => {
	const AUTOSAVE_TIMEOUT = 1000
	// // NOTE: This happens before un-render (only once)
	// const handleUnmount = () => {
	// 	return
	// }

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
	// 	return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	useInterval(() => AutoSaveModel.saveToLocal({
		foodCount: props.food,
		// gatherCount,
		// gatherIncomeLevel,
		// gatherSpeedLevel,
		money: props.money,
		stoneCount: props.stone,
		woodCount: props.wood
	}), AUTOSAVE_TIMEOUT)

	return null
}

const mapDispatchToProps = { }

const mapStateToProps = ({ gameReducer }: IApplicationState) => {
	return {
		food: gameReducer.food,
		money: gameReducer.money,
		stone: gameReducer.stone,
		units: gameReducer.units,
		wood: gameReducer.wood
	}
}

const AutoSave = connect(mapStateToProps, mapDispatchToProps)(memo(AutoSaveUnconnected))

export { AutoSave }
