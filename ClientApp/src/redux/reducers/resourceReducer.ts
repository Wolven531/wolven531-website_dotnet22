import { Unit } from '../../models/Unit'
import {
	initFoodCount,
	initMoney,
	initStoneCount,
	initWoodCount
} from '../../state/initializers'

import {
	ADD_FOOD,
	ADD_MONEY,
	ADD_STONE,
	ADD_WOOD,
	PURCHASE_UNIT,
	SET_FOOD,
	SET_MONEY,
	SET_STONE,
	SET_WOOD
} from '../actionTypes'

export interface IResourceReducerProps {
	food: number
	money: number
	stone: number
	wood: number
}

const initialState: IResourceReducerProps = {
	food: initFoodCount(),
	money: initMoney(),
	stone: initStoneCount(),
	wood: initWoodCount()
}

const resourceReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FOOD:
			return {
				...state,
				food: state.food + action.payload
			}
		case ADD_MONEY:
			return {
				...state,
				money: state.money + action.payload
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
			const cost = (action.payload as Unit).Cost

			return {
				...state,
				food: state.food - cost.Food,
				stone: state.stone - cost.Stone,
				wood: state.wood - cost.Wood
			}
		case SET_FOOD:
			return {
				...state,
				food: action.payload
			}
		case SET_MONEY:
			return {
				...state,
				money: action.payload
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
		default:
			return state
	}
}

export { resourceReducer }
