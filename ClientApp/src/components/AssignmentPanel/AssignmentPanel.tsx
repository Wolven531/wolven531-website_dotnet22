import React, { useState, FC } from 'react'

// import { useInterval } from '../../hooks/useInterval'

// import { AutoSave } from '../../models/AutoSave'

// import './AssignmentPanel.scss'

const AssignmentPanel: FC<{ gatherCount: number }> = (props) => {
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
			<h3>Gatherer Assignment ({calcNumberIdle()} idle)</h3>
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
				</li>
			</ul>
		</section>
	)
}

export { AssignmentPanel }
