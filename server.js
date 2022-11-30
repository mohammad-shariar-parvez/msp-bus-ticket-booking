const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5001;
const cors = require('cors');
// const error = require('./util/error');


const usersRoute = require('./routes/userRoute');
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require('./routes/bookingsRoute');


app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/buses', busesRoute);
app.use('/api/bookings', bookingsRoute);

app.get('/', (_, res) => {
	const obj = {
		name: 'PM',
		email: 'MINISTER'
	};

	res.json(obj);
});

// app.use((error, req, res, next) => {
// 	const message = error.message ? error.message : 'Server Error Occured2';
// 	const status = error.status ? error.status : 500;
// 	console.log('Error is o - ', error.message);
// 	// res.status(500).send('Something broke!');
// 	res.status(status).send({ message: "VAI EIDA KI ERROR RE" });
// });

app.listen(port, () => console.log(`listeningon pfshfy dsgdort ${port}`));