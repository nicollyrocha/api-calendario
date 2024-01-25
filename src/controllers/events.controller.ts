import { Events } from '../events.model';

const db = require('../config/database');

exports.createEvent = async (req: any, res: any) => {
	const { nameEvent, description, dateStart, dateEnd, idUser } = req.body;

	const { rows } = await db.query(
		`SELECT * FROM events WHERE id_user = '${idUser}' AND date_end >= '${dateStart}' AND date_start <= '${dateEnd}'`
	);
	if (rows.length > 0) {
		console.log('aaa', rows);
		return res.status(401).send('Eventos conflitantes');
	}
	await db.query(
		`INSERT INTO events (name_event, description, date_start, date_end, id_user) VALUES ('${nameEvent}', '${description}', '${dateStart}', '${dateEnd}', '${idUser}')`
	);
	return res.status(201).send({
		message: 'Event added successfully!',
		body: {
			user: { nameEvent, description, dateStart, dateEnd, idUser },
		},
	});
};

exports.getEventsFromUser = async (req: any, res: any) => {
	const id = req.params.id;

	const { rows } = await db.query(
		`SELECT * FROM events WHERE id_user = '${id}'`
	);

	if (rows.length > 0) {
		const rowsFormatted = rows.map((row: Events) => {
			return {
				dateStart: row.date_start,
				dateEnd: row.date_end,
				nameEvent: row.name_event,
				description: row.description,
				id: row.id,
				idUser: row.id_user,
			};
		});

		res.status(201).send({
			message: 'Events found!',
			body: {
				events: rowsFormatted,
			},
		});
	} else {
		return res.status(401).send('Não encontrado');
	}
};

exports.deleteEvent = async (req: any, res: any) => {
	const id = req.params.id;

	const { rows } = await db.query(`DELETE FROM events WHERE id = '${id}'`);

	res.status(201).send({
		message: 'Event deleted!',
		body: {
			data: rows,
		},
	});
};

exports.updateEvent = async (req: any, res: any) => {
	const data = req.body;
	console.log(data);
	const { rows } = await db.query(
		`UPDATE events SET name_event = '${data.nameEvent}', description = '${data.description}', date_start = '${data.dateStart}', date_end = '${data.dateEnd}' WHERE id = '${data.id}'`
	);

	res.status(201).send({
		message: 'Event updated!',
		body: {
			data: rows,
		},
	});
};

export {};
