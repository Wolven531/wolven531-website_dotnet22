import { Unit } from '../../models/Unit'
import {
	initFoodCount,
	initMoney,
	initStoneCount,
	initWoodCount
} from '../../state/initializers'

import {
	// ADD_FOOD,
	// ADD_MONEY,
	// ADD_STONE,
	// ADD_WOOD,
	PURCHASE_UNIT,
	SET_FOOD,
	SET_UNITS,
	// SET_MONEY,
	// SET_STONE,
	// SET_WOOD
} from '../actionTypes'
import {
	INITIAL_VILLAGER_COUNT,
	UNIT_ID_VILLAGER
} from '../../constants'

export interface IGameReducerProps {
	food: number
	money: number
	stone: number
	unitCount: any
	units: Unit[]
	wood: number
}

const initialState: IGameReducerProps = {
	food: initFoodCount(),
	money: initMoney(),
	stone: initStoneCount(),
	unitCount: { },
	units: [],
	wood: initWoodCount()
}

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_UNIT:
			const unit: Unit = action.payload
			const updatedUnitCount = { }
			const cost = unit.Cost

			Object.keys(state.unitCount).forEach(staleId => {
				updatedUnitCount[staleId] = parseInt(staleId, 10) === unit.Id
					? state.unitCount[unit.Id] + 1
					: state.unitCount[staleId]
			})

			return {
				...state,
				food: state.food - cost.Food,
				stone: state.stone - cost.Stone,
				unitCount: updatedUnitCount,
				wood: state.wood - cost.Wood
			}
		case SET_FOOD:
			return {
				...state,
				food: action.payload
			}
		case SET_UNITS:
			const newUnitCount = { }
			const newUnits: Unit[] = action.payload

			newUnits.forEach(unit => {
				if (unit.Id === UNIT_ID_VILLAGER) {
					newUnitCount[UNIT_ID_VILLAGER] = INITIAL_VILLAGER_COUNT
					return
				}
				newUnitCount[unit.Id] = 0
			})

			return {
				...state,
				unitCount: newUnitCount,
				units: action.payload
			}
		default:
			return state
	}
}

export { gameReducer }