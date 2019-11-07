// import React, { useState, FC, memo, useEffect } from 'react'
import React, { useState, FC, useEffect } from 'react'
import { connect } from 'react-redux'

import { useInterval } from '../../hooks/useInterval'

import {
	// GATHERER_COST,
	// GATHERER_INCOME,
	GATHERER_INITIAL_TICK,
	// GATHERER_MAX_SPEED,
	GATHERER_TICK_RATE,
	GATHERER_TIME_SECONDS,
	INITIAL_RESOURCE_FOOD
} from '../../constants'

import { monify } from '../utils'

import { Unit } from '../../models/Unit'

import { IApplicationState } from '../../redux/store'
import {
	// redux_addMoney,
	redux_resetUnitCount,
	redux_setFoodCount,
	redux_setUnits
} from '../../redux/actions/gameActions'
// import { redux_setUnits } from '../../redux/actions/unitActions'

import {
	// initFoodCount,
	initGatherCount,
	initGatherIncomeLevel,
	initGatherSpeedLevel,
	// initMoney,
	// initStoneCount,
	// initWoodCount
} from '../../state/initializers'

//import { Achievements } from '../../components/Achievements/Achievements'
// import { AssignmentPanel } from '../AssignmentPanel/AssignmentPanel'
import { Modal } from '../Modal/Modal'
import { AutoSave } from '../../models/AutoSave'
import { UnitDisplayConnected } from '../UnitDisplay/UnitDisplay'
// import { UpgradeDisplay } from '../UpgradeDisplay/UpgradeDisplay'
import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './ResourceControls.scss'

interface IResourceControlsProps {
	food: number
	money: number
	// redux_addMoney: (additionalAmount: number) => any
	redux_resetUnitCount: () => any
	redux_setFoodCount: (foodCount: number) => any
	redux_setUnits: (units: Unit[]) => any
	stone: number
	units: Unit[]
	wood: number
}

// const ResourceControls: FC = memo(() => {
const ResourceControlsUnconnected: FC<IResourceControlsProps> = (props) => {
	const [gatherIncomeLevel, setGatherIncomeLevel] = useState(initGatherIncomeLevel)
	const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [gatherTick, setGatherTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(false)
	const [gatherCount, setGatherCount] = useState(initGatherCount)

	const [areUnitsLoading, setAreUnitsLoading] = useState(true)
	// const [units, setUnits] = useState<Unit[]>([])

	// const addGatherer = () => {
	// 	// setMoney(staleMoney => staleMoney - GATHERER_COST)
	// 	setGatherCount(staleGatherCount => staleGatherCount + 1)
	// }
	// const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	const calcGatherTime = (): number => 1000 / GATHERER_TICK_RATE / gatherSpeedLevel
	// const calcGatherIncome = (): number => GATHERER_INCOME * (gatherIncomeLevel + 1)
	// const calcGatherIncomeUpgradeCost = (): number => Math.pow(gatherIncomeLevel + 1, 2) * 33
	// const calcGatherSpeedUpgradeCost = (): number => Math.pow(gatherSpeedLevel + 1, 3) * 66
	// const calcGatherTotalIncome = (): number => gatherCount * calcGatherIncome()
	// const collectFromGatherers = () => addMoney(calcGatherTotalIncome())
	const executeGatherTick = () => {
		if (gatherCount < 1) {
			return
		}
		if (gatherTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			// collectFromGatherers()
			setGatherTick(GATHERER_INITIAL_TICK)
			return
		}
		setGatherTick(staleGatherTick => staleGatherTick + 1)
	}
	// const handleUpgradeGatherIncome = () => {
	// 	addMoney(-1 * calcGatherIncomeUpgradeCost())
	// 	setGatherIncomeLevel(staleGatherIncomeLevel => staleGatherIncomeLevel + 1)
	// }
	// const handleUpgradeGatherSpeed = () => {
	// 	if (gatherSpeedLevel >= GATHERER_MAX_SPEED) {
	// 		return
	// 	}
	// 	addMoney(-1 * calcGatherSpeedUpgradeCost())
	// 	setGatherSpeedLevel(staleGatherSpeedLevel => staleGatherSpeedLevel + 1)
	// }
	const resetProgress = () => {
		// setMoney(0)
		setGatherCount(0)
		setGatherIncomeLevel(0)
		setGatherSpeedLevel(1)

		// reset other resources
		props.redux_resetUnitCount()
		props.redux_setFoodCount(INITIAL_RESOURCE_FOOD)
		// setStoneCount(0)
		// setWoodCount(0)
	}

	// // NOTE: This happens before un-render (only once)
	// const handleUnmount = () => {
	// 	return
	// }

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Resources - Wolven531 Web'
		fetch('/api/units/info')
			.then(resp => resp.json())
			.then(unitArray => {
				setAreUnitsLoading(false)
				props.redux_setUnits(unitArray)
				// setUnits(unitArray)
				// console.log(`[ handleMounted | ResourceControls ] info=`, JSON.stringify(info, null, 4), info)
			})
			.catch(err => console.error(err))
	// 	return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	useInterval(executeGatherTick, calcGatherTime())
	useInterval(() => AutoSave.saveToLocal({
		foodCount: props.food,
		gatherCount,
		gatherIncomeLevel,
		gatherSpeedLevel,
		money: props.money,
		stoneCount: props.stone,
		woodCount: props.wood
	}), 1000)

	return (
		<article className="resource-controls">
			{isShowingModal && (
				<Modal handleModalDialogClose={() => { setIsShowingModal(false) }}>
					<article>
						<h2>Options - Critter Manager</h2>
						<button onClick={() => { resetProgress() }}>Reset Progress</button>
					</article>
				</Modal>)}
			<section>
				<table>
					<thead>
						<tr>
							<th>Resource</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Money</td>
							<td>{monify(props.money)}</td>
						</tr>
						<tr>
							<td>Food</td>
							<td title={`${props.food} food`}><FoodEmoji /> {props.food}</td>
						</tr>
						<tr>
							<td>Stone</td>
							<td title={`${props.stone} stone`}><StoneEmoji /> {props.stone}</td>
						</tr>
						<tr>
							<td>Wood</td>
							<td title={`${props.wood} wood`}><WoodEmoji /> {props.wood}</td>
						</tr>
					</tbody>
				</table>
				<section className="unit-container">
					{areUnitsLoading
						? <p>Units Loading...</p>
						: props.units.map(unit => <UnitDisplayConnected key={unit.Id} unit={unit} />)}
				</section>
				{/*
				{gatherCount > 0 && <article>
						<p>Gatherers: {gatherCount} ({monify(calcGatherTotalIncome())} per collection)</p>
						<p>Gatherer Income Level: {gatherIncomeLevel} ({monify(calcGatherIncome())} per gatherer)</p>
						<p>Gatherer Speed Level: {gatherSpeedLevel} / {GATHERER_MAX_SPEED} (every {calcGatherTime().toFixed(2)} ms)</p>
						<UpgradeDisplay
							disabled={money < calcGatherIncomeUpgradeCost()}
							displayText={`Upgrade Gather Income (${monify(calcGatherIncomeUpgradeCost())})`}
							onUpgrade={() => { handleUpgradeGatherIncome() }}
							/>
						<br />
						<UpgradeDisplay
							disabled={money < calcGatherSpeedUpgradeCost() || gatherSpeedLevel >= GATHERER_MAX_SPEED}
							displayText={`Upgrade Gather Speed (${monify(calcGatherSpeedUpgradeCost())})`}
							onUpgrade={() => { handleUpgradeGatherSpeed() }}
							/>
						<br />
						<progress value={gatherTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
						<br/>
						<AssignmentPanel gatherCount={gatherCount}
							onFoodElapsed={(assigned: number) => { setFoodCount(staleCount => staleCount + assigned) }}
							onStoneElapsed={(assigned: number) => { setStoneCount(staleCount => staleCount + assigned) }}
							onWoodElapsed={(assigned: number) => { setWoodCount(staleCount => staleCount + assigned) }}
							/>
					</article>}
				*/}
			</section>
			<button onClick={() => { setIsShowingModal(true) }}>Show Options</button>
			{/*
			<section>
				<button className="add-money" onClick={() => { props.redux_addMoney(1) }}>Add Money</button>
				<UpgradeDisplay
					disabled={props.money < GATHERER_COST}
					onUpgrade={() => { addGatherer() }}
					displayText={`Buy Gatherer (${monify(GATHERER_COST)})`}
					/>
			</section>
			<Achievements />
			*/}
		</article>
	)
}

const mapDispatchToProps = {
	// redux_addMoney,
	redux_resetUnitCount,
	redux_setFoodCount,
	redux_setUnits
}

const mapStateToProps = ({ gameReducer }: IApplicationState) => {
	return {
		food: gameReducer.food,
		money: gameReducer.money,
		stone: gameReducer.stone,
		units: gameReducer.units,
		wood: gameReducer.wood
	}
}

const ResourceControls = connect(mapStateToProps, mapDispatchToProps)(ResourceControlsUnconnected)

export { ResourceControls }
