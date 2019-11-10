import React, { FC, memo } from 'react'
import { connect } from 'react-redux'

import {
	UNIT_ID_NONE
} from '../../constants'

import { Unit } from '../../models/Unit'

// import { redux_addMoney } from '../../redux/actions/appActions'
// import { redux_expendUnitCost } from '../../redux/actions/resourceActions'
import {
	redux_addFood,
	redux_addStone,
	redux_addWood,
	redux_purchaseUnit
} from '../../redux/actions/gameActions'
import { IApplicationState } from '../../redux/store'

import { AssignmentPanel } from '../AssignmentPanel/AssignmentPanel'
import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './UnitDisplay.scss'

interface IUnitDisplayProps {
	food: number
	money: number
	// redux_addMoney: (number) => any
	// redux_expendUnitCost: (unit: Unit) => any
	redux_addFood: (additionalAmount: number) => any
	redux_addStone: (additionalAmount: number) => any
	redux_addWood: (additionalAmount: number) => any
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
	const count = props.unitCount[unit.Id]

	return (
		<article className="unit-display">
			<p className="name">
				{unit.Name} <span className="count">(count: <span className="value">{count}</span>)</span>
			</p>
			<p className="desc">{unit.Info.Description}</p>
			{allCostsAreZero && <p>No cost</p>}
			{!allCostsAreZero &&
				<ul className="unit-cost">
					{unit.Cost.Food > 0 && <li>{unit.Cost.Food} <FoodEmoji /></li>}
					{unit.Cost.Stone > 0 && <li>{unit.Cost.Stone} <StoneEmoji /></li>}
					{unit.Cost.Wood > 0 && <li>{unit.Cost.Wood} <WoodEmoji /></li>}
				</ul>}
			{count > 0 &&
				<AssignmentPanel gatherCount={count}
					onFoodElapsed={(assigned: number) => { props.redux_addFood(assigned) }}
					onStoneElapsed={(assigned: number) => { props.redux_addStone(assigned) }}
					onWoodElapsed={(assigned: number) => { props.redux_addWood(assigned) }}
				/>}
			<button
				disabled={allCostsAreZero ||
					props.food < unit.Cost.Food ||
					props.stone < unit.Cost.Stone ||
					props.wood < unit.Cost.Wood}
				onClick={() => {
					// props.redux_expendUnitCost(unit)
					props.redux_purchaseUnit(unit)
				}}>Purchase</button>
		</article>
	)
}

const mapStateToProps = ({ gameReducer }: IApplicationState) => {
	return {
		food: gameReducer.food,
		money: gameReducer.money,
		stone: gameReducer.stone,
		unitCount: gameReducer.unitCount,
		wood: gameReducer.wood
	}
}

const mapDispatchToProps = {
	// redux_addMoney
	// redux_expendUnitCost,
	redux_addFood,
	redux_addStone,
	redux_addWood,
	redux_purchaseUnit
}

// NOTE: no memoization
// const UnitDisplayConnected = connect(mapStateToProps, mapDispatchToProps)(UnitDisplay)

// NOTE: memoize the component after it is connected
// const UnitDisplayConnected = memo(connect(mapStateToProps, mapDispatchToProps)(UnitDisplay))

// NOTE: memoize the component before it is connected
// TODO: does memo() provide a benefit here?
const UnitDisplayConnected = connect(mapStateToProps, mapDispatchToProps)(memo(UnitDisplay))

export {
	UnitDisplay,
	UnitDisplayConnected
}
