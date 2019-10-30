import {
	ADD_MONEY,
	SET_MONEY
} from '../actionTypes'

export interface IResourceReducerProps {
	food: number
	money: number
	stone: number
	wood: number
}

const initialState: IResourceReducerProps = {
	food: 0,
	money: 0,
	stone: 0,
	wood: 0
}

const resourceReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MONEY:
			state = {
				...state,
				money: state.money + action.payload
			}
			return state
		case SET_MONEY:
			state = {
				...state,
				money: action.payload
			}
			return state
		default:
			return state
	}
}

export { resourceReducer }
