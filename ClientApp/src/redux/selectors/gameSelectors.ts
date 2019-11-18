import { IApplicationState } from '../store'
import { Unit } from '../../models/Unit'

const selectCurrentPopulation = (state: IApplicationState): number => {
	const unitCount = state.gameReducer.unitCount
	let totalCount = 0

	Object.keys(unitCount).forEach(unitId => {
		totalCount += unitCount[unitId]
	})

	return totalCount
}

const selectAttackSum = (state: IApplicationState): number => {
	const unitCount = state.gameReducer.unitCount
	let totalAttack = 0

	if (state.gameReducer.units.length < 1) {
		return totalAttack
	}

	Object.keys(unitCount).forEach(unitId => {
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
	selectCurrentPopulation
}
