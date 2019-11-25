import {
	BUILDING_ID_HOUSE,
	BUILDING_POPULATION_HOUSE,
	INITIAL_POPULATION_CAP
} from '../../constants'

import { Unit } from '../../models/Unit'

import { IApplicationState } from '../store'

const selectAttackSum = (state: IApplicationState): number => {
	const unitCountMap = state.gameReducer.unitCountMap
	let totalAttack = 0

	if (state.gameReducer.units.length < 1) {
		return totalAttack
	}

	Object.keys(unitCountMap).forEach(unitId => {
		const unit: Unit | undefined = state.gameReducer.units.find(unit => String(unit.Id) === unitId)

		if (!unit) {
			return
		}

		const attack = unit.Info['Attack']

		if (isNaN(attack)) {
			return
		}

		totalAttack += attack
	})

	return totalAttack
}

const selectCurrentPopulation = (state: IApplicationState): number => {
	const unitCountMap = state.gameReducer.unitCountMap
	let totalCount = 0

	Object.keys(unitCountMap).forEach(unitId => {
		totalCount += unitCountMap[unitId]
	})

	return totalCount
}

const selectMaxPopulation = (state: IApplicationState) => {
	const buildingCountMap = state.gameReducer.buildingCountMap
	let totalCapacity = INITIAL_POPULATION_CAP

	Object.keys(buildingCountMap).forEach(buildingId => {
		if (buildingId === String(BUILDING_ID_HOUSE)) {
			const numHouses = buildingCountMap[buildingId]
			totalCapacity += BUILDING_POPULATION_HOUSE * numHouses
		}
	})

	return totalCapacity
}

const selectUnitCount = (unitId: string) => (state: IApplicationState): number => {
	const unitCountMap = state.gameReducer.unitCountMap
	const count = unitCountMap[unitId]

	if (!count) {
		return 0
	}

	return count
}

export {
	selectAttackSum,
	selectCurrentPopulation,
	selectMaxPopulation,
	selectUnitCount
}
