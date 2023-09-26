import persistence from '../config/app.config.js';
import enviroment from '../../db/db.js';

let sessionsDAO;

switch (persistence) {
	case 'memory':
		const { default: MemoryDAO } = await import('./memory/sessions.memory.js');
		sessionsDAO = MemoryDAO;
		break;
	case 'mongo':
		enviroment();
		const { default: MongoDAO } = await import('./mongo/sessions.mongo.js');
		sessionsDAO = MongoDAO;
		break;
}

export default sessionsDAO;