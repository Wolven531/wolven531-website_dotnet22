import {
	ADD_MONEY,
	SET_APP_LOADED,
	SET_MONEY
} from '../actionTypes'

const initialState = {
	appIsLoaded: false,
	money: 0
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_APP_LOADED:
			state = {
				...state,
				appIsLoaded: action.payload
			};
			return state
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

export { appReducer }
