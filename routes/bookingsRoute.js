const router = require("express").Router();
const Booking = require('../models/bookingsModel');
const Bus = require('../models/busModal');
const authMiddleware = require("../middlewares/authMiddleware");
const stripe = require('stripe')(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");

//book seat
router.post("/book-seat", authMiddleware, async (req, res) => {
	try {
		const newBooking = new Booking({
			...req.body,
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

//make payment
router.post("/make-payment", authMiddleware, async (req, res) => {

	try {
		const { token, amount } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id
		});
		console.log("Customer IS", customer);
		const payment = await stripe.charges.create({
			amount: amount,
			currency: 'cny',
			customer: customer.id,
			receipt_email: token.email
		}, {

			idempotencyKey: uuidv4(),
		});
		console.log("PAYMENT IS", payment);
		if (payment) {
			res.status(200).send({
				message: "Payment successful",
				data: {
					transactionId: payment.source.id
				},
				success: true,
			});
		}
		else {
			res.status(500).send({
				message: "Payment Failed",
				data: error,
				seatsBooked: bus.seatsBooked,
				success: false,
			});
		}


	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: "Payment failed",
			data: error,
			success: false,
		});
	}

});


//get bookings by user id

router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
	try {
		const bookings = await Booking.find({ userId: req.body.userId })
			.populate("bus")
			.populate("user");
		res.status(200).send({
			message: "Booking Fetch Successful",
			data: bookings,
			success: true,
		});
	} catch (error) {
		res.status(500).send({
			message: "Booking Fetch failed",
			data: error,
			success: false,
		});
	}
});


module.exports = router;