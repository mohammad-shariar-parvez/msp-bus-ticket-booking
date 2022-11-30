const router = require("express").Router();
const Booking = require('../models/bookingsModel');
const Bus = require('../models/busModal');
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book-seat", authMiddleware, async (req, res) => {
	try {
		const newBooking = new Booking({
			...req.body,
			transactionId: "4566",
			user: req.body.userId,
		});
		console.log("MAY BOOKING", newBooking);
		await newBooking.save();

		const bus = await Bus.findById(req.body.bus);
		bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
		await bus.save();

		res.status(200).send({
			message: "Booking successful",
			data: newBooking,
			seatsBooked: bus.seatsBooked,
			success: true,
		});
	} catch (error) {


		res.status(500).send({
			message: "Booking failed",
			data: error,
			success: false,
		});
	}
});

module.exports = router;