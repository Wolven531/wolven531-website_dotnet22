import {
	PURCHASE_UNIT,
	SET_UNITS
} from '../actionTypes'

import { Unit } from '../../models/Unit'

const redux_purchaseUnit = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const redux_setUnits = (units: Unit[]) => ({
	payload: units,
	type: SET_UNITS
})

const unitActions = {
	redux_purchaseUnit,
	redux_setUnits
}

export {
	unitActions,
	redux_purchaseUnit,
	redux_setUnits
}
