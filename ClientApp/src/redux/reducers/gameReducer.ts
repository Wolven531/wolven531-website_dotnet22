import { Unit } from '../../models/Unit'
import {
	initFoodCount,
	initMoney,
	initPopulationCap,
	initStoneCount,
	initUnitCount,
	initWoodCount
} from '../../state/initializers'

import {
	// ADD_MONEY,
	ADD_FOOD,
	ADD_STONE,
	ADD_WOOD,
	PURCHASE_UNIT,
	RESET_UNIT_COUNT,
	SET_FOOD,
	SET_STONE,
	SET_UNITS,
	SET_WOOD
	// SET_MONEY,
} from '../actionTypes'
import {
	INITIAL_VILLAGER_COUNT,
	UNIT_ID_VILLAGER
} from '../../constants'

export interface IGameReducerProps {
	food: number
	money: number
	populationCap: number
	stone: number
	unitCount: any
	units: Unit[]
	wood: number
}

const initialState: IGameReducerProps = {
	food: initFoodCount(),
	money: initMoney(),
	populationCap: initPopulationCap(),
	stone: initStoneCount(),
	unitCount: initUnitCount(),
	units: [],
	wood: initWoodCount()
}

const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FOOD:
			return {
				...state,
				food: state.food + action.payload
			}
		case ADD_STONE:
			return {
				...state,
				stone: state.stone + action.payload
			}
		case ADD_WOOD:
			return {
				...state,
				wood: state.wood + action.payload
			}
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
		case RESET_UNIT_COUNT:
			const resetUnitCount = { }

			state.units.forEach(unit => {
				if (unit.Id === UNIT_ID_VILLAGER) {
					resetUnitCount[UNIT_ID_VILLAGER] = INITIAL_VILLAGER_COUNT
					return
				}
				resetUnitCount[unit.Id] = 0
			})

			return {
				...state,
				unitCount: resetUnitCount
			}
		case SET_FOOD:
			return {
				...state,
				food: action.payload
			}
		case SET_STONE:
			return {
				...state,
				stone: action.payload
			}
		case SET_WOOD:
			return {
				...state,
				wood: action.payload
			}
		case SET_UNITS:
			return {
				...state,
				units: action.payload
			}
		default:
			return state
	}
}

export { gameReducer }
