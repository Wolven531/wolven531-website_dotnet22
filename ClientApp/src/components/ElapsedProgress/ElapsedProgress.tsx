import React, { useState, FC, memo } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_TIME_SECONDS,
	GATHERER_TICK_RATE,
	GATHERER_INITIAL_TICK
} from '../../constants'

// import './ElapsedProgress.scss'

interface IElapsedProgressProps {
	/** Filters so that elapse invocation occurs ONLY when resourceCount exceeds this number */
	minimumCountToEllapse?: number
	resourceCount: number
	/** Amount to increment progress bar */
	tickAmount?: number
	/** Max value of progress bar */
	tickMax?: number
	/** Number (ms) between ticks */
	tickRate?: number
	/** Start value of progress bar */
	tickStart?: number
	onElapsed: () => void
}

/**
 * Default vals:
 *   minimumCountToEllapse	= 1
 *   tickAmount				= 1
 *   tickMax				= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE
 *   tickRate				= 1000 / GATHERER_TICK_RATE
 *   tickStart				= GATHERER_INITIAL_TICK
 */
const ElapsedProgress: FC<IElapsedProgressProps> = memo((props) => {
	const minEllapse = props.minimumCountToEllapse === undefined
		? 1
		: props.minimumCountToEllapse
	const tickAmount = props.tickAmount === undefined
		? 1
		: props.tickAmount
	const tickMax = props.tickMax === undefined
		? GATHERER_TIME_SECONDS * GATHERER_TICK_RATE
		: props.tickMax
	const tickRate = props.tickRate === undefined
		? 1000 / GATHERER_TICK_RATE
		: props.tickRate
	const tickStart = props.tickStart === undefined
		? GATHERER_INITIAL_TICK
		: props.tickStart

	const [_tick, set_Tick] = useState(tickStart)

	const executeTick = () => {
		if (props.resourceCount < minEllapse) {
			return
		}
		if (_tick >= tickMax) {
			props.onElapsed()
			set_Tick(tickStart)
			return
		}
		set_Tick(staleTick => staleTick + tickAmount)
	}

	useInterval(executeTick, tickRate)

	return (
		<progress value={_tick} max={tickMax} />
	)
})

export { ElapsedProgress }
