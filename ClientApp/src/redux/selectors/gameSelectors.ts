import { IApplicationState } from '../store'
import { Unit } from '../../models/Unit'

const selectCurrentPopulation = (state: IApplicationState): number => {
	const unitCountMap = state.gameReducer.unitCountMap
	let totalCount = 0

	Object.keys(unitCountMap).forEach(unitId => {
		totalCount += unitCountMap[unitId]
	})

	return totalCount
}

const selectUnitCount = (unitId: string) => (state: IApplicationState): number => {
	const unitCountMap = state.gameReducer.unitCountMap
	const count = unitCountMap[unitId]

	if (!count) {
		return 0
	}

	return count
}

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

export {
	selectAttackSum,
	selectCurrentPopulation,
	selectUnitCount
}
