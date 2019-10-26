import { SET_APP_LOADED } from '../actionTypes'

const initialState = {
	appIsLoaded: false
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_APP_LOADED:
			state = {
				...state,
				appIsLoaded: action.payload
			};
			return state;
		// case DELETE_ITEM:
		//   state = {
		//   };
		//   return state;
		default:
			return state
	}
}

export { appReducer }
