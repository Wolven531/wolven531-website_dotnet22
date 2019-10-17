import React, { useState, FC } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_TIME_SECONDS,
	GATHERER_TICK_RATE,
	GATHERER_INITIAL_TICK
} from '../../constants'

// import { AutoSave } from '../../models/AutoSave'

// import './ElapsedProgress.scss'

const ElapsedProgress: FC<{ assigned: number, onElapsed: () => void }> = (props) => {
	const [_tick, set_Tick] = useState(GATHERER_INITIAL_TICK)

	const executeTick = () => {
		if (props.assigned < 1) {
			return
		}
		if (_tick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			props.onElapsed()
			set_Tick(GATHERER_INITIAL_TICK)
			return
		}
		set_Tick(staleTick => staleTick + 1)
	}

	// // NOTE: This happens before un-render (only once)
	// const handleUnmount = () => {
	// 	return
	// }

	// // NOTE: This happens after render (only once)
	// const handleMounted = () => {
	// 	return handleUnmount
	// }

	// // NOTE: empty (no arg) to track nothing, fires on mount/unmount
	// useEffect(handleMounted, [])

	// useInterval(() => AutoSave.saveToLocal(gatherIncomeLevel, gatherSpeedLevel, money, gatherCount), 1000)
	useInterval(executeTick, 1000 / GATHERER_TICK_RATE)

	return (
		<progress value={_tick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
	)
}

export { ElapsedProgress }
