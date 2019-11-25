import React, { FC, memo } from 'react'
import { connect } from 'react-redux'

import {
	UNIT_ID_NONE,
	UNIT_ID_VILLAGER
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
import {
	selectCurrentPopulation,
	selectMaxPopulation,
	selectUnitCount
} from '../../redux/selectors/gameSelectors'
import { IApplicationState } from '../../redux/store'

import { AssignmentPanel } from '../AssignmentPanel/AssignmentPanel'
import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './UnitDisplay.scss'

interface IUnitDisplayProps {
	currentPopulation: number
	food: number
	money: number
	populationCap: number
	// redux_addMoney: (number) => any
	// redux_expendUnitCost: (unit: Unit) => any
	redux_addFood: (additionalAmount: number) => any
	redux_addStone: (additionalAmount: number) => any
	redux_addWood: (additionalAmount: number) => any
	redux_purchaseUnit: (unit: Unit) => any
	stone: number
	unit: Unit
	unitCount: number
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
			<p className="name">{unit.Name}</p>
			<p className="count">(count: <span className="value">{props.unitCount}</span>)</p>
			<p className="desc">{unit.Info.Description}</p>
			{allCostsAreZero && <p>No cost</p>}
			{!allCostsAreZero &&
				<ul className="unit-cost">
					{unit.Cost.Food > 0 && <li>{unit.Cost.Food} <FoodEmoji /></li>}
					{unit.Cost.Stone > 0 && <li>{unit.Cost.Stone} <StoneEmoji /></li>}
					{unit.Cost.Wood > 0 && <li>{unit.Cost.Wood} <WoodEmoji /></li>}
				</ul>}
			{unit.Id === UNIT_ID_VILLAGER && props.unitCount > 0 &&
				<AssignmentPanel gatherCount={props.unitCount}
					onFoodElapsed={(assigned: number) => { props.redux_addFood(assigned) }}
					onStoneElapsed={(assigned: number) => { props.redux_addStone(assigned) }}
					onWoodElapsed={(assigned: number) => { props.redux_addWood(assigned) }}
				/>}
			<button
				disabled={allCostsAreZero ||
					props.food < unit.Cost.Food ||
					props.stone < unit.Cost.Stone ||
					props.wood < unit.Cost.Wood ||
					props.currentPopulation >= props.populationCap}
				onClick={() => {
					// props.redux_expendUnitCost(unit)
					props.redux_purchaseUnit(unit)
				}}>Purchase</button>
		</article>
	)
}

const mapStateToProps = (state: IApplicationState, ownProps: IUnitDisplayProps) => {
	const gameReducer = state.gameReducer

	return {
		currentPopulation: selectCurrentPopulation(state),
		food: gameReducer.food,
		money: gameReducer.money,
		populationCap: selectMaxPopulation(state),
		stone: gameReducer.stone,
		unitCount: selectUnitCount(String(ownProps.unit.Id))(state),
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
