import CustomRouter from './custom.router.js';

export default class CustomUsersRouter extends CustomRouter {
	init() {
		this.get('/', (req, res) => {
			const payload = {
				id: 5,
				name: "Matias",
				age: 27,
			}
			res.sendSuccess(payload);
		});
	};
};