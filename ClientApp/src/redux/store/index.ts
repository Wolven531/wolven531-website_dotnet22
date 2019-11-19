// import { rootReducer } from '../reducers'
import { appReducer } from '../reducers/appReducer'
import { IGameReducerProps, gameReducer } from '../reducers/gameReducer'

// The top-level state object
export interface IApplicationState {
	appReducer: any
	gameReducer: IGameReducerProps
	// counter: Counter.CounterState | undefined
	// weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. Important: names must match exactly, and that the reducer
// acts on the corresponding ApplicationState property type
// export const reducers = {
//     counter: Counter.reducer,
//     weatherForecasts: WeatherForecasts.reducer
// };
// export const reducers = rootReducer
export const reducers = {
	appReducer,
	gameReducer
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store
export interface AppThunkAction<TAction> {
	(dispatch: (action: TAction) => void, getState: () => IApplicationState): void
}
