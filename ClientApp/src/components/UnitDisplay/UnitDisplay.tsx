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
				{unit.Cost.Food > 0 && <li>Food (🥩): {unit.Cost.Food}</li>}
				{unit.Cost.Stone > 0 && <li>Stone (⛰): {unit.Cost.Stone}</li>}
				{unit.Cost.Wood > 0 && <li>Wood (🌳): {unit.Cost.Wood}</li>}
			</ul>
		</article>
	)
})

export { UnitDisplay }
