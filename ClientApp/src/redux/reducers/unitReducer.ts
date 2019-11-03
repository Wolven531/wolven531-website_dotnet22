import {
	PURCHASE_UNIT,
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
			const newUnitCount = { }
			const newUnits: Unit[] = action.payload

			newUnits.forEach(unit => {
				newUnitCount[unit.Id] = 0
			})

			return {
				unitCount: newUnitCount,
				units: action.payload
			}
		case PURCHASE_UNIT:
			const unit: Unit = action.payload
			const updatedUnitCount = { }

			Object.keys(state.unitCount).forEach(staleId => {
				updatedUnitCount[staleId] = parseInt(staleId, 10) === unit.Id
					? state.unitCount[unit.Id] + 1
					: state.unitCount[staleId]
			})

			return {
				...state,
				unitCount: updatedUnitCount
			}
		default:
			return state
	}
}

export { unitReducer }
