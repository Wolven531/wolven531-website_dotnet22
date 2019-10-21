import {
	STORAGEKEY_FOODCOUNT,
	STORAGEKEY_GATHERCOUNT,
	STORAGEKEY_GATHERINCOMELEVEL,
	STORAGEKEY_GATHERSPEEDLEVEL,
	STORAGEKEY_MONEY,
	STORAGEKEY_STONECOUNT,
	STORAGEKEY_WOODCOUNT
} from '../constants'

class AutoSave {
	public static saveToLocal(saveInfo: any) {
		Object.keys(saveInfo).forEach(key => {
			switch (key) {
				case 'foodCount':
					window.localStorage.setItem(STORAGEKEY_FOODCOUNT, JSON.stringify(saveInfo[key]))
					break
				case 'gatherIncomeLevel':
					window.localStorage.setItem(STORAGEKEY_GATHERINCOMELEVEL, JSON.stringify(saveInfo[key]))
					break
				case 'gatherSpeedLevel':
					window.localStorage.setItem(STORAGEKEY_GATHERSPEEDLEVEL, JSON.stringify(saveInfo[key]))
					break
				case 'money':
					window.localStorage.setItem(STORAGEKEY_MONEY, JSON.stringify(saveInfo[key]))
					break
				case 'gatherCount':
					window.localStorage.setItem(STORAGEKEY_GATHERCOUNT, JSON.stringify(saveInfo[key]))
					break
				case 'stoneCount':
					window.localStorage.setItem(STORAGEKEY_STONECOUNT, JSON.stringify(saveInfo[key]))
					break
				case 'woodCount':
					window.localStorage.setItem(STORAGEKEY_WOODCOUNT, JSON.stringify(saveInfo[key]))
					break
				default:
					console.warn(`[ saveToLocal | AutoSave ] Unrecognized property key: ${key}`)
					break
			}
		})
	}
}

export { AutoSave }
