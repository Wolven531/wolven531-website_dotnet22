import React, { FC } from 'react'
import { connect } from 'react-redux'

import {
	selectAttackSum,
	selectCurrentPopulation
} from '../../redux/selectors/gameSelectors'
import { IApplicationState } from '../../redux/store'

// import { monify } from '../utils'

import { FoodEmoji } from '../Emoji/FoodEmoji'
import { PeopleEmoji } from '../Emoji/PeopleEmoji'
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
		// <tbody>
		// 		<tr>
		// 			<td>Money</td>
		// 			<td>{monify(props.money)}</td>
		// 		</tr>
		// 		<tr>
		// 			<td>Pop Cap</td>
		// 			<td title={`${props.currentPopulation} of ${props.populationCap} max population (capacity)`}>
		// 				{props.currentPopulation} / {props.populationCap}
		// 			</td>
		// 		</tr>
		// 		<tr>
		// 			<td>Attack Total</td>
		// 			<td title={`${props.totalAttack} total attack power`}>
		// 				{props.totalAttack}
		// 			</td>
		// 		</tr>
		// 	</tbody>
		<div className="resource-display">
			<article className="top-row">
				<section
					className="resource food-display"
					title={`${props.food} food`}>
					{props.food} <FoodEmoji />
				</section>
				<section
					className="resource stone-display"
					title={`${props.stone} stone`}>
					{props.stone} <StoneEmoji />
				</section>
				<section
					className="resource wood-display"
					title={`${props.wood} wood`}>
					{props.wood} <WoodEmoji />
				</section>
			</article>
			<article className="bottom-row">
				<section
					className="resource population-display"
					title={`${props.currentPopulation} of ${props.populationCap} max population (capacity)`}>
					{props.currentPopulation} / {props.populationCap} <PeopleEmoji />
				</section>
			</article>
		</div>
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
