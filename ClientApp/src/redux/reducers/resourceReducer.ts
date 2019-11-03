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
			state = {
				...state,
				food: state.food + action.payload
			}
			return state
		case ADD_MONEY:
			state = {
				...state,
				money: state.money + action.payload
			}
			return state
		case ADD_STONE:
			state = {
				...state,
				stone: state.stone + action.payload
			}
			return state
		case ADD_WOOD:
			state = {
				...state,
				wood: state.wood + action.payload
			}
			return state
		case SET_FOOD:
			state = {
				...state,
				food: action.payload
			}
			return state
		case SET_MONEY:
			state = {
				...state,
				money: action.payload
			}
			return state
		case SET_STONE:
			state = {
				...state,
				stone: action.payload
			}
			return state
		case SET_WOOD:
			state = {
				...state,
				wood: action.payload
			}
			return state
		default:
			return state
	}
}

export { resourceReducer }
