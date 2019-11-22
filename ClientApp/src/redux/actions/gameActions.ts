import { Building } from '../../models/Building'
import { Unit } from '../../models/Unit'

import {
	ADD_FOOD,
	ADD_STONE,
	ADD_WOOD,
	PURCHASE_UNIT,
	RESET_UNIT_COUNT,
	SET_BUILDINGS,
	SET_FOOD,
	SET_STONE,
	SET_UNITS,
	SET_WOOD
} from '../actionTypes'

const redux_addFood = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_FOOD
})

const redux_addStone = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_STONE
})

const redux_addWood = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_WOOD
})

const redux_purchaseUnit = (unit: Unit) => ({
	payload: unit,
	type: PURCHASE_UNIT
})

const redux_resetUnitCount = () => ({
	payload: null,
	type: RESET_UNIT_COUNT
})

const redux_setBuildings = (buildings: Building[]) => ({
	payload: buildings,
	type: SET_BUILDINGS
})

const redux_setFoodCount = (count: number) => ({
	payload: count,
	type: SET_FOOD
})

const redux_setStoneCount = (count: number) => ({
	payload: count,
	type: SET_STONE
})

const redux_setWoodCount = (count: number) => ({
	payload: count,
	type: SET_WOOD
})

const redux_setUnits = (units: Unit[]) => ({
	payload: units,
	type: SET_UNITS
})

const gameActions = {
	redux_addFood,
	redux_addStone,
	redux_addWood,
	redux_purchaseUnit,
	redux_resetUnitCount,
	redux_setBuildings,
	redux_setFoodCount,
	redux_setStoneCount,
	redux_setWoodCount,
	redux_setUnits
}

export {
	gameActions,
	redux_addFood,
	redux_addStone,
	redux_addWood,
	redux_purchaseUnit,
	redux_resetUnitCount,
	redux_setBuildings,
	redux_setFoodCount,
	redux_setStoneCount,
	redux_setWoodCount,
	redux_setUnits
}
