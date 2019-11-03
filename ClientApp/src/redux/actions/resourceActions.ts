import {
	ADD_MONEY,
	PURCHASE_UNIT,
	SET_FOOD,
	SET_MONEY
} from '../actionTypes'

import { Unit } from '../../models/Unit'

const redux_addMoney = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_MONEY
})

const redux_expendUnitCost = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const redux_setFoodCount = (foodCount: number) => ({
	payload: foodCount,
	type: SET_FOOD
})

const redux_setMoney = (newAmount: number) => ({
	payload: newAmount,
	type: SET_MONEY
})

const resourceActions = {
	redux_addMoney,
	redux_expendUnitCost,
	redux_setFoodCount,
	redux_setMoney
}

export {
	resourceActions,
	redux_addMoney,
	redux_expendUnitCost,
	redux_setFoodCount,
	redux_setMoney
}
