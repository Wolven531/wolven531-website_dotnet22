// import { useState } from 'react'

import {
	// STORAGEKEY_ACHIEVEMENT_LEVEL_GATHER,
	// STORAGEKEY_ACHIEVEMENT_LEVEL_MONEY,
	INITIAL_POPULATION_CAP,
	INITIAL_RESOURCE_FOOD,
	STORAGEKEY_FOODCOUNT,
	STORAGEKEY_GATHERINCOMELEVEL,
	STORAGEKEY_GATHERSPEEDLEVEL,
	STORAGEKEY_MONEY,
	STORAGEKEY_POPULATION_CAP,
	STORAGEKEY_STONECOUNT,
	STORAGEKEY_UNITCOUNTMAP,
	STORAGEKEY_WOODCOUNT
} from '../constants'

//const initAchievements = (achievementType: string): any[] => {
//	let achieveStr: string | null = null

//	switch(achievementType) {
//		case 'gather':
//			achieveStr = window.localStorage.getItem(STORAGEKEY_ACHIEVEMENT_LEVEL_GATHER)
//			break
//		case 'money':
//			achieveStr = window.localStorage.getItem(STORAGEKEY_ACHIEVEMENT_LEVEL_MONEY)
//			break
//		default:
//			break
//	}

//	if (!achieveStr || achieveStr.length < 1) {
//		// 	return 0
//		return useState(0)
//	}
//	// return parseInt(achieveStr, 10)
//	return useState(parseInt(achieveStr, 10))
//}

const initFoodCount = (): number => {
	const foodStr = window.localStorage.getItem(STORAGEKEY_FOODCOUNT)
	if (!foodStr || foodStr.length < 1) {
		return INITIAL_RESOURCE_FOOD
	}
	return parseInt(foodStr, 10)
}

const initGatherIncomeLevel = (): number => {
	const gatherIncomeLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERINCOMELEVEL)
	if (!gatherIncomeLevelStr || gatherIncomeLevelStr.length < 1) {
		return 0
	}
	return parseInt(gatherIncomeLevelStr, 10)
}

const initGatherSpeedLevel = (): number => {
	const gatherSpeedLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERSPEEDLEVEL)
	if (!gatherSpeedLevelStr || gatherSpeedLevelStr.length < 1) {
		return 1
	}
	return parseInt(gatherSpeedLevelStr, 10)
}

const initMoney = (): number => {
	const moneyStr = window.localStorage.getItem(STORAGEKEY_MONEY)
	if (!moneyStr || moneyStr.length < 1) {
		return 0
	}
	return parseInt(moneyStr, 10)
}

const initPopulationCap = (): number => {
	const populationCapStr = window.localStorage.getItem(STORAGEKEY_POPULATION_CAP)
	if (!populationCapStr || populationCapStr.length < 1) {
		return INITIAL_POPULATION_CAP
	}
	return parseInt(populationCapStr, 10)
}

const initStoneCount = (): number => {
	const stoneStr = window.localStorage.getItem(STORAGEKEY_STONECOUNT)
	if (!stoneStr || stoneStr.length < 1) {
		return 0
	}
	return parseInt(stoneStr, 10)
}

const initUnitCountMap = (): any => {
	const unitCountMapStr = window.localStorage.getItem(STORAGEKEY_UNITCOUNTMAP)
	if (!unitCountMapStr || unitCountMapStr.length < 1) {
		return { }
	}
	return JSON.parse(unitCountMapStr)
}

const initWoodCount = (): number => {
	const woodStr = window.localStorage.getItem(STORAGEKEY_WOODCOUNT)
	if (!woodStr || woodStr.length < 1) {
		return 0
	}
	return parseInt(woodStr, 10)
}

export {
	//initAchievements,
	initFoodCount,
	initGatherIncomeLevel,
	initGatherSpeedLevel,
	initMoney,
	initPopulationCap,
	initStoneCount,
	initUnitCountMap,
	initWoodCount
}
