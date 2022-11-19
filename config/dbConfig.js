const mongoose = require('mongoose');
mongoose.connect(process.env.mongo_url);

const db = mongoose.connection;

db.on("connected", () => {
	console.log("Mongodb conneted successfull");
});
db.off("connected", () => {
	console.log("Mongodb conneted failed");
});