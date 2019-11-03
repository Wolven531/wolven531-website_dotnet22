import { Unit } from '../../models/Unit'

import {
	PURCHASE_UNIT,
	SET_UNITS
} from '../actionTypes'

import { redux_expendUnitCost } from './resourceActions'

const redux_purchase = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const redux_purchaseUnit = (unit: Unit) => dispatch => {
	dispatch(redux_expendUnitCost(unit))
	dispatch(redux_purchase(unit))
}

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
