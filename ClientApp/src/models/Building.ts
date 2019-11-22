import { Cost } from './Cost'

class Building {
	constructor(
		public Cost: Cost,
		public Id: number,
		public Info: any,
		public Name: string) {}
}

export { Building }
