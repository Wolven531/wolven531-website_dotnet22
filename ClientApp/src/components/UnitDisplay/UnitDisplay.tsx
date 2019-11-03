import React, { FC } from 'react'
import { connect } from 'react-redux'

import {
	UNIT_ID_NONE
} from '../../constants'

import { Unit } from '../../models/Unit'

// import { redux_addMoney } from '../../redux/actions/appActions'
import { redux_purchaseUnit } from '../../redux/actions/unitActions'
import { IApplicationState } from '../../redux/store'

import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './UnitDisplay.scss'

interface IUnitDisplayProps {
	food: number
	money: number
	// redux_addMoney: (number) => any
	redux_purchaseUnit: (unit: Unit) => any
	stone: number
	unit: Unit
	unitCount: any
	wood: number
}

const UnitDisplay: FC<IUnitDisplayProps> = (props) => {
	const unit = props.unit
	
	if (unit.Id === UNIT_ID_NONE) {
		return null
	}

	const allCostsAreZero = unit.Cost.Food === 0 && unit.Cost.Stone === 0 && unit.Cost.Wood === 0

	return (
		<article className="unit-display">
			<p>{unit.Name} (count: {props.unitCount[unit.Id]})</p>
			<p>{unit.Info.Description}</p>
			<ul className="unit-cost">
				{unit.Cost.Food > 0 && <li>Food (<FoodEmoji />): {unit.Cost.Food}</li>}
				{unit.Cost.Stone > 0 && <li>Stone (<StoneEmoji />): {unit.Cost.Stone}</li>}
				{unit.Cost.Wood > 0 && <li>Wood (<WoodEmoji />): {unit.Cost.Wood}</li>}
			</ul>
			<button
				disabled={allCostsAreZero ||
					props.food < unit.Cost.Food ||
					props.stone < unit.Cost.Stone ||
					props.wood < unit.Cost.Wood}
				onClick={() => { props.redux_purchaseUnit(unit) }}>Purchase</button>
		</article>
	)
}

const mapStateToProps = ({ resourceReducer, unitReducer }: IApplicationState) => {
	return {
		food: resourceReducer.food,
		money: resourceReducer.money,
		stone: resourceReducer.stone,
		unitCount: unitReducer.unitCount,
		wood: resourceReducer.wood
	}
}

const mapDispatchToProps = {
	// redux_addMoney
	redux_purchaseUnit
}

const UnitDisplayConnected = connect(mapStateToProps, mapDispatchToProps)(UnitDisplay)
// TODO: does memo() provide a benefit here?
// const UnitDisplayConnected = memo(connect(mapStateToProps, mapDispatchToProps)(UnitDisplay))

export {
	UnitDisplay,
	UnitDisplayConnected
}
