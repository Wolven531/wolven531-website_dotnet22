import { Building } from '../../models/Building'
import { Unit } from '../../models/Unit'
import {
	initFoodCount,
	initMoney,
	initStoneCount,
	initUnitCountMap,
	initWoodCount
} from '../../state/initializers'

import {
	// ADD_MONEY,
	ADD_FOOD,
	ADD_STONE,
	ADD_WOOD,
	PURCHASE_UNIT,
	RESET_UNIT_COUNT,
	SET_BUILDINGS,
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
	buildings: Building[]
	food: number
	money: number
	stone: number
	unitCountMap: any
	units: Unit[]
	wood: number
}

const initialState: IGameReducerProps = {
	buildings: [],
	food: initFoodCount(),
	money: initMoney(),
	stone: initStoneCount(),
	unitCountMap: initUnitCountMap(),
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
			const updatedUnitCountMap = { }
			const cost = unit.Cost

			Object.keys(state.unitCountMap).forEach(staleId => {
				updatedUnitCountMap[staleId] = parseInt(staleId, 10) === unit.Id
					? state.unitCountMap[unit.Id] + 1
					: state.unitCountMap[staleId]
			})

			return {
				...state,
				food: state.food - cost.Food,
				stone: state.stone - cost.Stone,
				unitCountMap: updatedUnitCountMap,
				wood: state.wood - cost.Wood
			}
		case RESET_UNIT_COUNT:
			const resetUnitCountMap = { }

			state.units.forEach(unit => {
				if (unit.Id === UNIT_ID_VILLAGER) {
					resetUnitCountMap[UNIT_ID_VILLAGER] = INITIAL_VILLAGER_COUNT
					return
				}
				resetUnitCountMap[unit.Id] = 0
			})

			return {
				...state,
				unitCountMap: resetUnitCountMap
			}
		case SET_BUILDINGS:
			return {
				...state,
				buildings: action.payload
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
