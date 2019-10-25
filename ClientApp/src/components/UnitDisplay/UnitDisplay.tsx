import React, { FC, memo } from 'react'

import {
	UNIT_ID_NONE
} from '../../constants'

import { Unit } from '../../models/Unit'

interface IUnitDisplayProps {
	unit: Unit
}

const UnitDisplay: FC<IUnitDisplayProps> = memo(({ unit }) => {
	if (unit.Id === UNIT_ID_NONE) {
		return null
	}
	return (
		<article className="unit-display">
			<p>{unit.Name}</p>
			<p>{unit.Info.Description}</p>
			<ul className="unit-cost">
				<li>Food: {unit.Cost.Food}</li>
				<li>Stone: {unit.Cost.Stone}</li>
				<li>Wood: {unit.Cost.Wood}</li>
			</ul>
		</article>
	)
})

export { UnitDisplay }
