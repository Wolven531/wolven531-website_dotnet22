import {
	ADD_MONEY,
	SET_MONEY
} from '../actionTypes'

const initialState = {
	money: 0
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
