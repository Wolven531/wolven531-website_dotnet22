import React, { FC } from 'react'
import { connect } from 'react-redux'

import {
	selectAttackSum,
	selectCurrentPopulation
} from '../../redux/selectors/gameSelectors'
import { IApplicationState } from '../../redux/store'

import { monify } from '../utils'

import { FoodEmoji } from '../Emoji/FoodEmoji'
import { StoneEmoji } from '../Emoji/StoneEmoji'
import { WoodEmoji } from '../Emoji/WoodEmoji'

import './ResourceDisplay.scss'

interface IResourceDisplayProps {
	currentPopulation: number
	food: number
	money: number
	populationCap: number
	stone: number
	totalAttack: number
	wood: number
}

const ResourceDisplayUnconnected: FC<IResourceDisplayProps> = (props) => {
	return (
		<table className="resource-display">
			<thead>
				<tr>
					<th>Resource</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Money</td>
					<td>{monify(props.money)}</td>
				</tr>
				<tr>
					<td>Food</td>
					<td title={`${props.food} food`}><FoodEmoji /> {props.food}</td>
				</tr>
				<tr>
					<td>Stone</td>
					<td title={`${props.stone} stone`}><StoneEmoji /> {props.stone}</td>
				</tr>
				<tr>
					<td>Wood</td>
					<td title={`${props.wood} wood`}><WoodEmoji /> {props.wood}</td>
				</tr>
				<tr>
					<td>Pop Cap</td>
					<td title={`${props.currentPopulation} of ${props.populationCap} max population (capacity)`}>
						{props.currentPopulation} / {props.populationCap}
					</td>
				</tr>
				<tr>
					<td>Attack Total</td>
					<td title={`${props.totalAttack} total attack power`}>
						{props.totalAttack}
					</td>
				</tr>
			</tbody>
		</table>
	)
}

const mapDispatchToProps = {}

const mapStateToProps = (state: IApplicationState) => {
	const gameReducer = state.gameReducer

	return {
		currentPopulation: selectCurrentPopulation(state),
		food: gameReducer.food,
		money: gameReducer.money,
		populationCap: gameReducer.populationCap,
		stone: gameReducer.stone,
		totalAttack: selectAttackSum(state),
		wood: gameReducer.wood
	}
}

const ResourceDisplay = connect(mapStateToProps, mapDispatchToProps)(ResourceDisplayUnconnected)

export { ResourceDisplay }
