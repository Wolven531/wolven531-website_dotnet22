class ServerInfo {
	constructor(
		public healthy: boolean,
		public startupTime: string,
		public uniquePageHits: number) { }
}

export { ServerInfo }
