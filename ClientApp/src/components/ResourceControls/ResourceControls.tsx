import React, { useState, FC, useEffect } from 'react'
import { connect } from 'react-redux'

import {
	BUILDING_ID_NONE,
	// GATHERER_MAX_SPEED,
	INITIAL_RESOURCE_FOOD,
	INITIAL_RESOURCE_STONE,
	INITIAL_RESOURCE_WOOD
} from '../../constants'

import { Building } from '../../models/Building'
import { Unit } from '../../models/Unit'

import {
	// redux_addMoney,
	redux_resetUnitCount,
	redux_setBuildings,
	redux_setFoodCount,
	redux_setStoneCount,
	redux_setWoodCount,
	redux_setUnits
} from '../../redux/actions/gameActions'
import { IApplicationState } from '../../redux/store'

// import {
// 	initGatherIncomeLevel,
// 	initGatherSpeedLevel
// } from '../../state/initializers'

//import { Achievements } from '../../components/Achievements/Achievements'
import { AutoSave } from '../AutoSave/AutoSave'
import { Modal } from '../Modal/Modal'
import { ResourceDisplay } from '../ResourceDisplay/ResourceDisplay'
import { UnitDisplayConnected } from '../UnitDisplay/UnitDisplay'
// import { UpgradeDisplay } from '../UpgradeDisplay/UpgradeDisplay'

import './ResourceControls.scss'

interface IResourceControlsProps {
	buildings: Building[]
	// redux_addMoney: (additionalAmount: number) => any
	redux_resetUnitCount: () => any
	redux_setBuildings: (buildings: Building[]) => any
	redux_setFoodCount: (count: number) => any
	redux_setStoneCount: (count: number) => any
	redux_setWoodCount: (count: number) => any
	redux_setUnits: (units: Unit[]) => any
	units: Unit[]
}

// const ResourceControls: FC = memo(() => {
const ResourceControlsUnconnected: FC<IResourceControlsProps> = (props) => {
	const TAB_BUILDINGS = 1
	const TAB_UNITS = 0
	// const [gatherIncomeLevel, setGatherIncomeLevel] = useState(initGatherIncomeLevel)
	// const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [isShowingModal, setIsShowingModal] = useState(false)
	const [areBuildingsLoading, setAreBuildingsLoading] = useState(true)
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

		fetch('/api/buildings/info')
			.then(resp => resp.json())
			.then(buildingArray => {
				setAreBuildingsLoading(false)
				props.redux_setBuildings(buildingArray)
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
				<ResourceDisplay />
				{currentTab === TAB_UNITS && <section className="unit-container">
					{areUnitsLoading
						? <p>Units Loading...</p>
						: props.units.map(unit => <UnitDisplayConnected key={unit.Id} unit={unit} />)}
				</section>}
				{currentTab === TAB_BUILDINGS && <section className="building-container">
					{areBuildingsLoading
						? <p>Buildings Loading...</p>
						: props.buildings.map(building => {
							if (building.Id === BUILDING_ID_NONE) {
								return
							}

							return (
								<p key={building.Id}>{building.Name}</p>
							)
						})}
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
	redux_setBuildings,
	redux_setFoodCount,
	redux_setStoneCount,
	redux_setUnits,
	redux_setWoodCount
}

const mapStateToProps = ({ gameReducer }: IApplicationState) => {
	return {
		buildings: gameReducer.buildings,
		units: gameReducer.units
	}
}

const ResourceControls = connect(mapStateToProps, mapDispatchToProps)(ResourceControlsUnconnected)

export { ResourceControls }
