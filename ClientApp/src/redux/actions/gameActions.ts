import { Unit } from '../../models/Unit'

import {
	ADD_FOOD,
	PURCHASE_UNIT,
	RESET_UNIT_COUNT,
	SET_FOOD,
	SET_UNITS
} from '../actionTypes'

const redux_addFood = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_FOOD
})

const redux_purchaseUnit = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const redux_resetUnitCount = () => ({
	payload: null,
	type: RESET_UNIT_COUNT
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
	redux_addFood,
	redux_purchaseUnit,
	redux_resetUnitCount,
	redux_setFoodCount,
	redux_setUnits
}

export {
	gameActions,
	redux_addFood,
	redux_purchaseUnit,
	redux_resetUnitCount,
	redux_setFoodCount,
	redux_setUnits
}
