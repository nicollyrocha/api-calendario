const bcrypt = require('bcryptjs');
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

exports.createUser = async (req: any, res: any) => {
	const { name, email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	const { rows } = await db.query(
		`SELECT * FROM users WHERE email = '${email}'`
	);

	if (rows.length > 0) {
		return res.status(409).send({
			message: 'User already exists',
		});
	} else {
		await db.query(
			'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
			[email, hash, name]
		);
		res.status(201).send({
			message: 'User added successfully!',
			body: {
				user: { email, password, name },
			},
		});
	}
};

exports.login = async (req: any, res: any) => {
	const { email, password } = req.body;

	const { rows } = await db.query(
		`SELECT * FROM users WHERE email = '${email}'`
	);

	if (rows.length > 0) {
		const db_password = rows[0].password;

		const isSame = bcrypt.compareSync(password, db_password);
		if (isSame) {
			return res.status(201).send({
				message: 'User added successfully!',
				body: {
					user: rows[0],
				},
			});
		} else {
			return res.status(401).send('E-mail ou senha incorretos.');
		}
	} else {
		return res.status(401).send('E-mail ou senha incorretos.');
	}
};

exports.getUser = async (req: any, res: any) => {
	const id = req.params.id;

	const { rows } = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

	if (rows.length > 0) {
		res.status(201).send({
			message: 'User found!',
			body: {
				user: rows[0],
			},
		});
	} else {
		return res.status(401).send('Usuário não encontrado');
	}
};

export {};
