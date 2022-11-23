const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5001;
const cors = require('cors');
// const error = require('./util/error');


const usersRoute = require('./routes/userRoute');



app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoute);

app.get('/', (_, res) => {
	const obj = {
		name: 'SM',
		email: 'Zubayer'
	};

	res.json(obj);
});

// app.use((error, req, res, next) => {
// 	const message = error.message ? error.message : 'Server Error Occured2';
// 	const status = error.status ? error.status : 500;
// 	console.log('Error is o - ', error.message);
// 	res.status(status).json({ message });
// });

app.listen(port, () => console.log(`listeningon pfshfy dsgdort ${port}`));