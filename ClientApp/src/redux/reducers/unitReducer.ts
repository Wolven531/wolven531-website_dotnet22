import {
	SET_UNITS
} from '../actionTypes'

import { Unit } from '../../models/Unit'

export interface IUnitReducerProps {
	unitCount: any
	units: Unit[]
}

const initialState: IUnitReducerProps = {
	unitCount: { },
	units: []
}

const unitReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_UNITS:
			const newUnitCount = { };
			(action.payload as Unit[]).forEach(unit => {
				newUnitCount[unit.Id] = 0
			})
			state = {
				unitCount: newUnitCount,
				units: action.payload
			}
			return state
		default:
			return state
	}
}

export { unitReducer }
