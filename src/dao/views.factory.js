import persistence from '../config/app.config.js';
import enviroment from '../../db/db.js';

let viewsDao;

switch (persistence) {
	case 'memory':
		const { default: MemoryDAO } = await import('./memory/views.memory.js');
		viewsDao = MemoryDAO;
		break;
	case 'mongo':
		enviroment();
		const { default: MongoDAO } = await import('./mongo/views.mongo.js');
		viewsDao = MongoDAO;
		break;
}

export default viewsDao;