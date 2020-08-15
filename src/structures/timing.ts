export const createRandomInterval = (func: CallableFunction, min = 20000, max = 120000): void => {
	const gen = () => setTimeout(async() => {
		await func();
		gen();
	}, min + Math.random() * (max - min));
	gen();
}