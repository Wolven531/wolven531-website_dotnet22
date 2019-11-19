import React, { useState, FC, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	// GATHERER_MAX_SPEED,
	INITIAL_RESOURCE_FOOD,
	INITIAL_RESOURCE_STONE,
	INITIAL_RESOURCE_WOOD
} from '../../constants'

import { monify } from '../utils'

import { Unit } from '../../models/Unit'

import {
	// redux_addMoney,
	redux_resetUnitCount,
	redux_setFoodCount,
	redux_setStoneCount,
	redux_setWoodCount,
	redux_setUnits
} from '../../redux/actions/gameActions'
import {
	selectAttackSum,
	selectCurrentPopulation
} from '../../redux/selectors/gameSelectors'
import { IApplicationState } from '../../redux/store'

// import {
// 	initGatherIncomeLevel,
// 	initGatherSpeedLevel
// } from '../../state/initializers'

//import { Achievements } from '../../components/Achievements/Achievements'
import { AutoSave } from '../AutoSave/AutoSave'
import { Modal } from '../Modal/Modal'
import { UnitDisplayConnected } from '../UnitDisplay/UnitDisplay'
// import { UpgradeDisplay } from '../UpgradeDisplay/UpgradeDisplay'
import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './ResourceControls.scss'

interface IResourceControlsProps {
	currentPopulation: number
	food: number
	money: number
	populationCap: number
	// redux_addMoney: (additionalAmount: number) => any
	redux_resetUnitCount: () => any
	redux_setFoodCount: (count: number) => any
	redux_setStoneCount: (count: number) => any
	redux_setWoodCount: (count: number) => any
	redux_setUnits: (units: Unit[]) => any
	stone: number
	totalAttack: number
	units: Unit[]
	wood: number
}

// const ResourceControls: FC = memo(() => {
const ResourceControlsUnconnected: FC<IResourceControlsProps> = (props) => {
	const TAB_BUILDINGS = 1
	const TAB_UNITS = 0
	// const [gatherIncomeLevel, setGatherIncomeLevel] = useState(initGatherIncomeLevel)
	// const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [isShowingModal, setIsShowingModal] = useState(false)
	const [areUnitsLoading, setAreUnitsLoading] = useState(true)
	const [currentTab, setCurrentTab] = useState(TAB_UNITS)

	// const calcGatherIncomeUpgradeCost = (): number => Math.pow(gatherIncomeLevel + 1, 2) * 33
	// const calcGatherSpeedUpgradeCost = (): number => Math.pow(gatherSpeedLevel + 1, 3) * 66

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
		// setGatherIncomeLevel(0)
		// setGatherSpeedLevel(1)

		// reset other resources
		props.redux_resetUnitCount()
		props.redux_setFoodCount(INITIAL_RESOURCE_FOOD)
		props.redux_setStoneCount(INITIAL_RESOURCE_STONE)
		props.redux_setWoodCount(INITIAL_RESOURCE_WOOD)
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
			})
			.catch(err => console.error(err))
	// 	return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	return (
		<article className="resource-controls">
			<AutoSave />
			{isShowingModal && (
				<Modal handleModalDialogClose={() => { setIsShowingModal(false) }}>
					<article>
						<h2>Options - Critter Manager</h2>
						<button onClick={() => { resetProgress() }}>Reset Progress</button>
					</article>
				</Modal>)}
			<section>
				<div className="tab-switcher">
					<button onClick={() => { setCurrentTab(TAB_UNITS) }}>Units</button>
					<button onClick={() => { setCurrentTab(TAB_BUILDINGS) }}>Buildings</button>
				</div>
				<table className="resource-counts">
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
						<tr>
							<td>Pop Cap</td>
							<td title={`${props.currentPopulation} of ${props.populationCap} max population (capacity)`}>
								{props.currentPopulation} / {props.populationCap}
							</td>
						</tr>
						<tr>
							<td>Attack Total</td>
							<td title={`${props.totalAttack} total attack power`}>
								{props.totalAttack}
							</td>
						</tr>
					</tbody>
				</table>
				{currentTab === TAB_UNITS && <section className="unit-container">
					{areUnitsLoading
						? <p>Units Loading...</p>
						: props.units.map(unit => <UnitDisplayConnected key={unit.Id} unit={unit} />)}
				</section>}
				{/*
				{gatherCount > 0 && <article>
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
					</article>}
				*/}
			</section>
			<button onClick={() => { setIsShowingModal(true) }}>Show Options</button>
			{/*
			<button className="add-money" onClick={() => { props.redux_addMoney(1) }}>Add Money</button>
			<Achievements />
			*/}
		</article>
	)
}

const mapDispatchToProps = {
	// redux_addMoney,
	redux_resetUnitCount,
	redux_setFoodCount,
	redux_setStoneCount,
	redux_setWoodCount,
	redux_setUnits
}

const mapStateToProps = (state: IApplicationState) => {
	const gameReducer = state.gameReducer

	return {
		currentPopulation: selectCurrentPopulation(state),
		food: gameReducer.food,
		money: gameReducer.money,
		populationCap: gameReducer.populationCap,
		stone: gameReducer.stone,
		totalAttack: selectAttackSum(state),
		units: gameReducer.units,
		wood: gameReducer.wood
	}
}

const ResourceControls = connect(mapStateToProps, mapDispatchToProps)(ResourceControlsUnconnected)

export { ResourceControls }
