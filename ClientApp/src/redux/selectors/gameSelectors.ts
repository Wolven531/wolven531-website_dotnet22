import { IApplicationState } from '../store'

const selectCurrentPopulation = (state: IApplicationState): number => {
	const unitCount = state.gameReducer.unitCount
	let totalCount = 0

	Object.keys(unitCount).forEach(unitId => {
		totalCount += unitCount[unitId]
	})

	return totalCount
}

export {
	selectCurrentPopulation
}
