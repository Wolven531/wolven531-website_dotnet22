import {
	ADD_MONEY,
	SET_APP_LOADED,
	SET_MONEY
} from '../actionTypes'

// NOTE: app section
const redux_setAppLoaded = (isLoaded: boolean) => ({
	payload: isLoaded,
	type: SET_APP_LOADED
})

// NOTE: money section
const redux_addMoney = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_MONEY
})

const redux_setMoney = (newAmount: number) => ({
	payload: newAmount,
	type: SET_MONEY
})

const appActions = {
	redux_setAppLoaded
}

export {
	appActions,
	redux_addMoney,
	redux_setAppLoaded,
	redux_setMoney
}
