import React, { useState, FC, memo } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_COST,
	GATHERER_INCOME,
	GATHERER_INITIAL_TICK,
	GATHERER_MAX_SPEED,
	GATHERER_TICK_RATE,
	GATHERER_TIME_SECONDS
} from '../../constants'

//import { Achievements } from '../../components/Achievements/Achievements'
import { AssignmentPanel } from '../AssignmentPanel/AssignmentPanel'
import { Modal } from '../Modal/Modal'
import { AutoSave } from '../../models/AutoSave'
import {
	initFoodCount,
	initGatherCount,
	initGatherIncomeLevel,
	initGatherSpeedLevel,
	initMoney,
	initStoneCount,
	initWoodCount
} from '../../state/initializers'
import { UpgradeDisplay } from '../UpgradeDisplay/UpgradeDisplay'
import { monify } from '../utils'

import './MoneyControls.scss'

const MoneyControls: FC = () => {
	const [gatherIncomeLevel, setGatherIncomeLevel] = useState(initGatherIncomeLevel)
	const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [gatherTick, setGatherTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)
	const [money, setMoney] = useState(initMoney)
	const [gatherCount, setGatherCount] = useState(initGatherCount)
	const [foodCount, setFoodCount] = useState(initFoodCount)
	const [stoneCount, setStoneCount] = useState(initStoneCount)
	const [woodCount, setWoodCount] = useState(initWoodCount)

	const addGatherer = () => {
		setMoney(staleMoney => staleMoney - GATHERER_COST)
		setGatherCount(staleGatherCount => staleGatherCount + 1)
	}
	const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	const calcGatherTime = (): number => 1000 / GATHERER_TICK_RATE / gatherSpeedLevel
	const calcGatherIncome = (): number => GATHERER_INCOME * (gatherIncomeLevel + 1)
	const calcGatherIncomeUpgradeCost = (): number => Math.pow(gatherIncomeLevel + 1, 2) * 33
	const calcGatherSpeedUpgradeCost = (): number => Math.pow(gatherSpeedLevel + 1, 3) * 66
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
	const handleUpgradeGatherIncome = () => {
		addMoney(-1 * calcGatherIncomeUpgradeCost())
		setGatherIncomeLevel(staleGatherIncomeLevel => staleGatherIncomeLevel + 1)
	}
	const handleUpgradeGatherSpeed = () => {
		if (gatherSpeedLevel >= GATHERER_MAX_SPEED) {
			return
		}
		addMoney(-1 * calcGatherSpeedUpgradeCost())
		setGatherSpeedLevel(staleGatherSpeedLevel => staleGatherSpeedLevel + 1)
	}
	const resetProgress = () => {
		setMoney(0)
		setGatherCount(0)
		setGatherIncomeLevel(0)
		setGatherSpeedLevel(1)
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

	useInterval(executeGatherTick, calcGatherTime())
	useInterval(() => AutoSave.saveToLocal(gatherIncomeLevel, gatherSpeedLevel, money, gatherCount), 1000)

	return (
		<article className="money-controls">
			{isShowingModal && (
				<Modal handleModalDialogClose={() => { setIsShowingModal(false) }}>
					<article>
						<h2>Welcome to Critter Manager!</h2>
						<button onClick={() => { resetProgress() }}>Reset Progress</button>
					</article>
				</Modal>)}
			<section>
				<p>Money: {monify(money)}</p>
				<p>Food: {foodCount}</p>
				<p>Stone: {stoneCount}</p>
				<p>Wood: {woodCount}</p>
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
							onFoodElapsed={() => { setFoodCount(staleCount => staleCount + 1) }}
							onStoneElapsed={() => { setStoneCount(staleCount => staleCount + 1) }}
							onWoodElapsed={() => { setWoodCount(staleCount => staleCount + 1) }}
							/>
					</article>}
			</section>
			<section>
				<button className="add-money" onClick={() => { addMoney() }}>Add Money</button>
				<UpgradeDisplay
					disabled={money < GATHERER_COST}
					onUpgrade={() => { addGatherer() }}
					displayText={`Buy Gatherer (${monify(GATHERER_COST)})`}
					/>
			</section>
			{/*
			<Achievements />
			*/}
		</article>
	)
}

export { MoneyControls }
