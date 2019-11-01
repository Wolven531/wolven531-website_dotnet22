import {
	SET_APP_LOADED
} from '../actionTypes'

const redux_setAppLoaded = (isLoaded: boolean) => ({
	payload: isLoaded,
	type: SET_APP_LOADED
})

const appActions = {
	redux_setAppLoaded
}

export {
	appActions,
	redux_setAppLoaded
}
