import { Cost } from './Cost'

class Unit {
	constructor(
		public Cost: Cost,
		public Id: number,
		public Info: any,
		public Name: string) {}
}

export { Unit }
