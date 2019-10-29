// import React, { useState, FC, memo, useEffect } from 'react'
import React, { useState, FC, useEffect } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_COST,
	GATHERER_INCOME,
	GATHERER_INITIAL_TICK,
	// GATHERER_MAX_SPEED,
	GATHERER_TICK_RATE,
	GATHERER_TIME_SECONDS,
	INITIAL_RESOURCE_FOOD
} from '../../constants'

import { monify } from '../utils'

import { Unit } from '../../models/Unit'

import {
	initFoodCount,
	initGatherCount,
	initGatherIncomeLevel,
	initGatherSpeedLevel,
	initMoney,
	initStoneCount,
	initWoodCount
} from '../../state/initializers'

//import { Achievements } from '../../components/Achievements/Achievements'
// import { AssignmentPanel } from '../AssignmentPanel/AssignmentPanel'
import { Modal } from '../Modal/Modal'
import { AutoSave } from '../../models/AutoSave'
import { UnitDisplayConnected } from '../UnitDisplay/UnitDisplay'
import { UpgradeDisplay } from '../UpgradeDisplay/UpgradeDisplay'
import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './ResourceControls.scss'

// const ResourceControls: FC = memo(() => {
const ResourceControls: FC = () => {
	const [gatherIncomeLevel, setGatherIncomeLevel] = useState(initGatherIncomeLevel)
	const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [gatherTick, setGatherTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(false)
	const [money, setMoney] = useState(initMoney)
	const [gatherCount, setGatherCount] = useState(initGatherCount)
	const [foodCount, setFoodCount] = useState(initFoodCount)
	const [stoneCount, setStoneCount] = useState(initStoneCount)
	const [woodCount, setWoodCount] = useState(initWoodCount)

	const [areUnitsLoading, setAreUnitsLoading] = useState(true)
	const [units, setUnits] = useState<Unit[]>([])

	const addGatherer = () => {
		setMoney(staleMoney => staleMoney - GATHERER_COST)
		setGatherCount(staleGatherCount => staleGatherCount + 1)
	}
	const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	const calcGatherTime = (): number => 1000 / GATHERER_TICK_RATE / gatherSpeedLevel
	const calcGatherIncome = (): number => GATHERER_INCOME * (gatherIncomeLevel + 1)
	// const calcGatherIncomeUpgradeCost = (): number => Math.pow(gatherIncomeLevel + 1, 2) * 33
	// const calcGatherSpeedUpgradeCost = (): number => Math.pow(gatherSpeedLevel + 1, 3) * 66
	const calcGatherTotalIncome = (): number => gatherCount * calcGatherIncome()
	const collectFromGatherers = () => addMoney(calcGatherTotalIncome())
	const executeGatherTick = () => {
		if (gatherCount < 1) {
			return
		}
		if (gatherTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			collectFromGatherers()
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
		setMoney(0)
		setGatherCount(0)
		setGatherIncomeLevel(0)
		setGatherSpeedLevel(1)

		// reset other resources
		setFoodCount(INITIAL_RESOURCE_FOOD)
		setStoneCount(0)
		setWoodCount(0)
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
				setUnits(unitArray)
				// console.log(`[ handleMounted | ResourceControls ] info=`, JSON.stringify(info, null, 4), info)
			})
			.catch(err => console.error(err))
	// 	return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	useInterval(executeGatherTick, calcGatherTime())
	useInterval(() => AutoSave.saveToLocal({
		foodCount,
		gatherCount,
		gatherIncomeLevel,
		gatherSpeedLevel,
		money,
		stoneCount,
		woodCount
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
							<td>{monify(money)}</td>
						</tr>
						<tr>
							<td>Food</td>
							<td title={`${foodCount} food`}><FoodEmoji /> {foodCount}</td>
						</tr>
						<tr>
							<td>Stone</td>
							<td title={`${stoneCount} stone`}><StoneEmoji /> {stoneCount}</td>
						</tr>
						<tr>
							<td>Wood</td>
							<td title={`${woodCount} wood`}><WoodEmoji /> {woodCount}</td>
						</tr>
					</tbody>
				</table>
				{areUnitsLoading
					? <p>Units Loading...</p>
					: units.map(unit => <UnitDisplayConnected key={unit.Id} unit={unit} />)}
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
			<section>
				<button className="add-money" onClick={() => { addMoney() }}>Add Money</button>
				<UpgradeDisplay
					disabled={money < GATHERER_COST}
					onUpgrade={() => { addGatherer() }}
					displayText={`Buy Gatherer (${monify(GATHERER_COST)})`}
					/>
			</section>
			<button onClick={() => { setIsShowingModal(true) }}>Show Options</button>
			{/*
			<Achievements />
			*/}
		</article>
	)
}

export { ResourceControls }
