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

app.listen(port, () => console.log(`listeningon pfshfy dsgdort ${port}`));