import React, { useState, FC } from 'react'

// import { useInterval } from '../../hooks/useInterval'

// import {
// 	GATHERER_TIME_SECONDS,
// 	GATHERER_TICK_RATE,
// 	GATHERER_INITIAL_TICK
// } from '../../constants'

// import { AutoSave } from '../../models/AutoSave'
import { ElapsedProgress } from '../ElapsedProgress/ElapsedProgress'

import './AssignmentPanel.scss'

const AssignmentPanel: FC<{
		gatherCount: number
		onFoodElapsed: (numAssigned: number) => void
		onStoneElapsed: (numAssigned: number) => void
		onWoodElapsed: (numAssigned: number) => void
	}> = (props) => {
	const [assignedToFood, setAssignedToFood] = useState(0)
	const [assignedToStone, setAssignedToStone] = useState(0)
	const [assignedToWood, setAssignedToWood] = useState(0)

	const calcNumberIdle = (): number => Math.max(0, props.gatherCount - assignedToFood - assignedToStone - assignedToWood)

	// // NOTE: This happens before un-render (only once)
	// const handleUnmount = () => {
	// 	return
	// }

	// // NOTE: This happens after render (only once)
	// const handleMounted = () => {
	// 	return handleUnmount
	// }

	// // NOTE: empty (no arg) to track nothing, fires on mount/unmount
	// useEffect(handleMounted, [])

	// useInterval(() => AutoSave.saveToLocal(gatherIncomeLevel, gatherSpeedLevel, money, gatherCount), 1000)

	return (
		<section className="assignment">
			<h3>Gatherer Assignment ({calcNumberIdle()} / {props.gatherCount} idle)</h3>
			<ul>
				<li>Food
					<button disabled={assignedToFood <= 0}
						onClick={() => {
						if (assignedToFood <= 0) {
							return
						}
						setAssignedToFood(staleFood => staleFood - 1)
					}}>-</button>
					{/* <input type="text" readOnly={true} value={assignedToFood} /> */}
					{assignedToFood}
					<button disabled={calcNumberIdle() <= 0}
						onClick={() => {
						if (assignedToFood >= props.gatherCount) {
							return
						}
						setAssignedToFood(staleFood => staleFood + 1)
						}}>+</button>
					<ElapsedProgress extraClasses="food"
						resourceCount={assignedToFood} onElapsed={() => { props.onFoodElapsed(assignedToFood) }} />
				</li>
				<li>Stone
					<button disabled={assignedToStone <= 0}
						onClick={() => {
						if (assignedToStone <= 0) {
							return
						}
						setAssignedToStone(staleStone => staleStone - 1)
					}}>-</button>
					{/* <input type="text" readOnly={true} value={assignedToStone} /> */}
					{assignedToStone}
					<button disabled={calcNumberIdle() <= 0}
						onClick={() => {
						if (assignedToStone >= props.gatherCount) {
							return
						}
						setAssignedToStone(staleStone => staleStone + 1)
						}}>+</button>
					<ElapsedProgress extraClasses="stone"
						resourceCount={assignedToStone} onElapsed={() => { props.onStoneElapsed(assignedToStone) }} />
				</li>
				<li>Wood
					<button disabled={assignedToWood <= 0}
						onClick={() => {
							if (assignedToWood <= 0) {
								return
							}
							setAssignedToWood(staleWood => staleWood - 1)
						}}>-</button>
					{/* <input type="text" readOnly={true} value={assignedToWood} /> */}
					{assignedToWood}
					<button disabled={calcNumberIdle() <= 0}
						onClick={() => {
							if (assignedToWood >= props.gatherCount) {
								return
							}
							setAssignedToWood(staleWood => staleWood + 1)
						}}>+</button>
					<ElapsedProgress extraClasses="wood"
						resourceCount={assignedToWood} onElapsed={() => { props.onWoodElapsed(assignedToWood) }} />
				</li>
			</ul>
		</section>
	)
}

export { AssignmentPanel }
