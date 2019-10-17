import React, { useState, FC } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_TIME_SECONDS,
	GATHERER_TICK_RATE,
	GATHERER_INITIAL_TICK
} from '../../constants'

// import { AutoSave } from '../../models/AutoSave'

// import './AssignmentPanel.scss'

const AssignmentPanel: FC<{ gatherCount: number }> = (props) => {
	const [assignedToFood, setAssignedToFood] = useState(0)
	const [assignedToStone, setAssignedToStone] = useState(0)
	const [assignedToWood, setAssignedToWood] = useState(0)

	const [foodTick, setFoodTick] = useState(GATHERER_INITIAL_TICK)
	const [stoneTick, setStoneTick] = useState(GATHERER_INITIAL_TICK)
	const [woodTick, setWoodTick] = useState(GATHERER_INITIAL_TICK)

	const calcNumberIdle = (): number => Math.max(0, props.gatherCount - assignedToFood - assignedToStone - assignedToWood)
	const foodTickElapsed = (foodGatherers: number) => {

	}
	const stoneTickElapsed = (stoneGatherers: number) => {

	}
	const woodTickElapsed = (woodGatherers: number) => {

	}
	const executeFoodTick = () => {
		if (assignedToFood < 1) {
			return
		}
		if (foodTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			foodTickElapsed(assignedToFood)
			setFoodTick(GATHERER_INITIAL_TICK)
			return
		}
		setFoodTick(staleTick => staleTick + 1)
	}
	const executeStoneTick = () => {
		if (assignedToStone < 1) {
			return
		}
		if (stoneTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			stoneTickElapsed(assignedToStone)
			setStoneTick(GATHERER_INITIAL_TICK)
			return
		}
		setStoneTick(staleTick => staleTick + 1)
	}
	const executeWoodTick = () => {
		if (assignedToWood < 1) {
			return
		}
		if (woodTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			woodTickElapsed(assignedToWood)
			setWoodTick(GATHERER_INITIAL_TICK)
			return
		}
		setWoodTick(staleTick => staleTick + 1)
	}

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
	useInterval(executeFoodTick, 1000 / GATHERER_TICK_RATE)
	useInterval(executeStoneTick, 1000 / GATHERER_TICK_RATE)
	useInterval(executeWoodTick, 1000 / GATHERER_TICK_RATE)

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
					<input type="text" readOnly={true} value={assignedToFood} />
					<button disabled={calcNumberIdle() <= 0}
						onClick={() => {
						if (assignedToFood >= props.gatherCount) {
							return
						}
						setAssignedToFood(staleFood => staleFood + 1)
						}}>+</button>
						<progress value={foodTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
				</li>
				<li>Wood
					<button disabled={assignedToWood <= 0}
						onClick={() => {
						if (assignedToWood <= 0) {
							return
						}
						setAssignedToWood(staleWood => staleWood - 1)
					}}>-</button>
					<input type="text" readOnly={true} value={assignedToWood} />
					<button disabled={calcNumberIdle() <= 0}
						onClick={() => {
						if (assignedToWood >= props.gatherCount) {
							return
						}
						setAssignedToWood(staleWood => staleWood + 1)
						}}>+</button>
						<progress value={woodTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
				</li>
				<li>Stone
					<button disabled={assignedToStone <= 0}
						onClick={() => {
						if (assignedToStone <= 0) {
							return
						}
						setAssignedToStone(staleStone => staleStone - 1)
					}}>-</button>
					<input type="text" readOnly={true} value={assignedToStone} />
					<button disabled={calcNumberIdle() <= 0}
						onClick={() => {
						if (assignedToStone >= props.gatherCount) {
							return
						}
						setAssignedToStone(staleStone => staleStone + 1)
						}}>+</button>
						<progress value={stoneTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
				</li>
			</ul>
		</section>
	)
}

export { AssignmentPanel }
