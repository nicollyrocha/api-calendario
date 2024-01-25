import { Router } from 'express';
const userController = require('../../controllers/user.controller');
const eventsController = require('../../controllers/events.controller');

const router = Router();

router.get('/', (_, res) => {
	return res.send('Olá, DEV!');
});

router.post('/users', userController.createUser);
router.post('/login', userController.login);
router.get(`/user/:id`, userController.getUser);
router.post('/events', eventsController.createEvent);
router.get('/events/:id', eventsController.getEventsFromUser);
router.post('/events', eventsController.createEvent);
router.delete('/event/:id', eventsController.deleteEvent);
router.put('/event/update', eventsController.updateEvent);

export { router };
