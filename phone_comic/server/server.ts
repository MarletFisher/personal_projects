import * as express from 'express';

import { Request, Response } from 'express';
import { Account } from 'src/app/types/Account';
import { getChapterByNumber } from './src/getChapterByNumber';
import { getChapters } from './src/getChapters';

const app = express();
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(cors({ origin: true }));

// Middleware
app.use(express.json());

// SQL connection config
const config = {
  user: 'sa',
  password: 'Patricks321*',
  server: 'localhost',
  port: 1433,
  database: 'PhoneComicDatabase',
  authentication: {
    type: 'default',
  },
  options: {
    encrypt: true,
  },
  trustServerCertificate: true,
};

// get test
app.route('/').get((req: Request, res: Response) => {
  return res.send('Chapter API is working');
});

app.route('/api/chapters').get(getChapters);

app.get('/api/chapter/:chapterNum', getChapterByNumber);

app.post('/api/registerUser', async (req, res) => {
  const d = new Date();
  try {
    let user: Account = {
      username: req.body.username,
      password: '',
      salt: '',
      member: false,
      registerDate: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      lastChapterRead: 0,
      lastPageRead: 0,
      email: req.body.email,
    };

    // bcrypt
    //   .genSalt(10)
    //   .then((salt: string) => {
    //     console.log('Salt: ', salt);
    //     user.salt = salt;
    //     return bcrypt.hash(req.body.password, salt);
    //   })
    //   .then((hash: string) => {
    //     console.log('Hash: ', hash);
    //     user.password = hash;
    //   })
    //   .catch((err: any) => console.log(err.message));

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log('salt:', salt);
    console.log('hashedPassword:', hashedPassword);

    user.salt = salt;
    user.password = hashedPassword;

    console.log('Registering user:', user.username);
    console.log('PasswordHash:', user.password);
    console.log('PasswordSalt:', user.salt);

    // SQL logic
    var conn = await sql.connect(config);
    const result = await conn
      .request()
      .query(
        `INSERT INTO TestAppSchema.UserAccount VALUES ('${user.username}', '${user.password}', '${user.salt}', 0, '${user.registerDate}', '${user.firstName}', '${user.lastName}', 0, 0, '${user.email}')`
      );
    console.log(result);

    res.send({ registrationStatus: 'User registered.' });
    res.status(201).send();
  } catch (err: any) {
    console.error(err.message);
    res.send({ error: 'Error: User was not registered.' });
    res.status(500).send();
  }
});

app.post('/api/userLogin', async (req, res) => {
  var conn = await sql.connect(config);
  var user: any;

  var resultSet = await conn
    .request()
    .query(
      `SELECT * FROM TestAppSchema.UserAccount WHERE Username = '${req.body.username}'`
    );

  console.log(resultSet.recordset.length, ' rows returned');

  if (resultSet.recordset[0]) {
    console.log('Found user', resultSet.recordset[0].UserName);
    user = resultSet.recordset[0];
  } else {
    console.log('User not found, now exiting...');
    res.send({
      loginStatus: 'No user with username: ' + req.body.username,
    });
    res.status(400);
    return;
  }
  try {
    console.log(
      'Comparing',
      req.body.username,
      'with password:',
      req.body.password
    );
    console.log('with', user.UserName, 'and', user.PasswordHash);
    if (await bcrypt.compare(req.body.password, user.PasswordHash.trim())) {
      res.send({
        username: user.UserName,
        member: user.Member,
        registerDate: user.RegisterDate,
        firstName: user.FirstName,
        lastName: user.LastName,
        lastChapterRead: user.LastChapterRead,
        lastPageRead: user.LastPageRead,
        email: user.email,
      });
      res.status(201).send();
    } else {
      res.send({ loginStatus: 'Unable to login' });
      res.status(201).send();
    }
  } catch {
    res.status(500).send('not allowed');
  }
});

app.listen(3000, () => {
  console.log('Application listening at http://localhost:3000');
});

/*
const express = require("express");
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

app.listen(PORT, () =>
	console.log(`it's alive on port http://localhost:${PORT}`)
);

app.get("/tshirt", (req, res) => {
	res.status(200).send({
		// data payload JSON
		tshirt: "👕",
		size: "large",
	});
});

app.post("/tshirt/:id", (req, res) => {
	const { id } = req.params;
	const { logo } = req.body;

	if (!logo) {
		res.status(418).send({ message: "We need a logo!" });
	}

	res.send({
		tshirt: `👕 with your ${logo} and ID of ${id}`,
	});
});
*/
