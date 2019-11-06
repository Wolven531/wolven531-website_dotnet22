import { Unit } from '../../models/Unit'

import {
	PURCHASE_UNIT,
	SET_FOOD,
	SET_UNITS
} from '../actionTypes'

const redux_purchaseUnit = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const redux_setFoodCount = (foodCount: number) => ({
	payload: foodCount,
	type: SET_FOOD
})

const redux_setUnits = (units: Unit[]) => ({
	payload: units,
	type: SET_UNITS
})

const gameActions = {
	redux_purchaseUnit,
	redux_setFoodCount,
	redux_setUnits
}

export {
	gameActions,
	redux_purchaseUnit,
	redux_setFoodCount,
	redux_setUnits
}