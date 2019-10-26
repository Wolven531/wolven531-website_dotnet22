import { SET_APP_LOADED } from '../actionTypes'

const redux_setAppLoaded = (isLoaded: boolean) => ({
	type: SET_APP_LOADED,
	payload: isLoaded
})

// const redux_delete = (id) => ({
// 	type: DELETE_ITEM,
// 	payload: id
// })

const appActions = {
	redux_setAppLoaded,
	// redux_delete
}

export {
	appActions,
	redux_setAppLoaded
}
