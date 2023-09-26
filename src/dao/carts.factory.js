import persistence from '../config/app.config.js';
import enviroment from '../../db/db.js';

let cartsDAO;

switch (persistence) {
	case 'memory':
		const { default: MemoryDAO } = await import('./memory/carts.memory.js');
		cartsDAO = MemoryDAO;
		break;
	case 'mongo':
		enviroment();
		const { default: MongoDAO } = await import('./mongo/carts.mongo.js');
		cartsDAO = MongoDAO;
		break;
}

export default cartsDAO;