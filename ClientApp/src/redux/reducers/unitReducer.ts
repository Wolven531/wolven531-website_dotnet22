import {
	SET_UNITS
} from '../actionTypes'

import { Unit } from '../../models/Unit'

export interface IResourceReducerProps {
	units: Unit[]
}

const initialState: IResourceReducerProps = {
	units: []
}

const unitReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_UNITS:
			state = {
				...state,
				units: action.payload
			}
			return state
		default:
			return state
	}
}

export { unitReducer }
