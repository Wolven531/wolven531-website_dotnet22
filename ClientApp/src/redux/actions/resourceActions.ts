import {
	ADD_MONEY,
	SET_MONEY
} from '../actionTypes'

const redux_addMoney = (additionalAmount: number) => ({
	payload: additionalAmount,
	type: ADD_MONEY
})

const redux_setMoney = (newAmount: number) => ({
	payload: newAmount,
	type: SET_MONEY
})

const resourceActions = {
	redux_addMoney,
	redux_setMoney
}

export {
	resourceActions,
	redux_addMoney,
	redux_setMoney
}
