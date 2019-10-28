import React, { FC, memo } from 'react'

import {
	UNIT_ID_NONE
} from '../../constants'

import { Unit } from '../../models/Unit'

import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

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
				{unit.Cost.Food > 0 && <li>Food (<FoodEmoji />): {unit.Cost.Food}</li>}
				{unit.Cost.Stone > 0 && <li>Stone (<StoneEmoji />): {unit.Cost.Stone}</li>}
				{unit.Cost.Wood > 0 && <li>Wood (<WoodEmoji />): {unit.Cost.Wood}</li>}
			</ul>
			{/*
			<br />
			<button onClick={() => { return }}>Purchase</button>
			*/}
		</article>
	)
})

export { UnitDisplay }
