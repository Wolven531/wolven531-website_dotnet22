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
 * @summary A multi-use progress bar, using a Functional approach and memoization
 * @name ElapsedProgress
 *
 * @param {number} minimumCountToEllapse - Filters so that elapse invocation occurs ONLY when resourceCount exceeds this number
 * @default 1
 * @param {number} tickAmount - Amount to increment progress bar
 * @default 1
 * @param {number} tickMax - Max value of progress bar
 * @default (GATHERER_TIME_SECONDS * GATHERER_TICK_RATE)
 * @param {number} tickRate - Number (ms) between ticks
 * @default (1000 / GATHERER_TICK_RATE)
 * @param {number} tickStart - Start value of progress bar
 * @default GATHERER_INITIAL_TICK
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
