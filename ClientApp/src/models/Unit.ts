import { UnitCost } from './UnitCost'

class Unit {
	constructor(
		public Cost: UnitCost,
		public Id: number,
		public Info: any,
		public Name: string) {}
}

export { Unit }
