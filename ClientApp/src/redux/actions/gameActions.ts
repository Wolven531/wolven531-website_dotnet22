import { Unit } from '../../models/Unit'

import {
	PURCHASE_UNIT
} from '../actionTypes'

const redux_purchaseUnit = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const appActions = {
	redux_purchaseUnit
}

export {
	appActions,
	redux_purchaseUnit
}
