import { INITIAL_RESOURCE_FOOD } from '../../constants'

import {
	ADD_FOOD,
	ADD_MONEY,
	ADD_STONE,
	SET_FOOD,
	SET_MONEY,
	SET_STONE
} from '../actionTypes'

export interface IResourceReducerProps {
	food: number
	money: number
	stone: number
	wood: number
}

const initialState: IResourceReducerProps = {
	food: INITIAL_RESOURCE_FOOD,
	money: 0,
	stone: 0,
	wood: 0
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
		default:
			return state
	}
}

export { resourceReducer }
