import {
	SET_UNITS
} from '../actionTypes'

import { Unit } from '../../models/Unit'

const redux_setUnits = (units: Unit[]) => ({
	payload: units,
	type: SET_UNITS
})

const unitActions = {
	redux_setUnits
}

export {
	unitActions,
	redux_setUnits
}
