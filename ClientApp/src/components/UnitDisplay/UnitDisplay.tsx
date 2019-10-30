import React, { FC } from 'react'
import { connect } from 'react-redux'

import {
	UNIT_ID_NONE
} from '../../constants'

import { Unit } from '../../models/Unit'

// import { redux_addMoney } from '../../redux/actions/appActions'
import { IApplicationState } from '../../redux/store'

import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

interface IUnitDisplayProps {
	money: number
	// redux_addMoney: (number) => any
	unit: Unit
}

const UnitDisplay: FC<IUnitDisplayProps> = (props) => {
	const unit = props.unit
	
	if (unit.Id === UNIT_ID_NONE) {
		return null
	}

	return (
		<article className="unit-display">
			<p>{unit.Name}</p>
			<p>{unit.Info.Description}</p>
			<ul className="unit-cost">
				{unit.Cost.Food > 0 && <li>Food (<FoodEmoji />): {unit.Cost.Food}</li>}
				{unit.Cost.Stone > 0 && <li>Stone (<StoneEmoji />): {unit.Cost.Stone}</li>}
				{unit.Cost.Wood > 0 && <li>Wood (<WoodEmoji />): {unit.Cost.Wood}</li>}
			</ul>
			{/*
			<br />
			<button onClick={() => { return }}>Purchase</button>
			*/}
		</article>
	)
}

const mapStateToProps = ({ resourceReducer }: IApplicationState) => {
	return { money: resourceReducer.money }
}

const mapDispatchToProps = {
	// redux_addMoney
}

const UnitDisplayConnected = connect(mapStateToProps, mapDispatchToProps)(UnitDisplay)
// TODO: does memo() provide a benefit here?
// const UnitDisplayConnected = memo(connect(mapStateToProps, mapDispatchToProps)(UnitDisplay))

export {
	UnitDisplay,
	UnitDisplayConnected
}
