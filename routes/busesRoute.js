const router = require("express").Router();
const Bus = require("../models/busModal");
const authMiddleware = require("../middlewares/authMiddleware");

// add-bus

router.post("/add-bus", authMiddleware, async (req, res) => {
	try {
		const existingBus = await Bus.findOne({ number: req.body.number });
		if (existingBus) {
			return res.status(200).send({
				success: false,
				message: "Bus already exists",
			});
		}
		const newBus = new Bus(req.body);
		await newBus.save();
		return res.status(200).send({
			success: true,
			message: "Bus added successfully",
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
});

// get-all-buses
router.post("/get-all-buses", authMiddleware, async (req, res) => {
	try {
		const buses = await Bus.find(req.body);
		return res.status(200).send({
			success: true,
			message: "Buses fetched successfully",
			data: buses,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
});

// update bus
router.post("/update-bus", authMiddleware, async (req, res) => {
	try {
		const buses = await Bus.findByIdAndUpdate(req.body._id, req.body);

		return res.status(200).send({
			success: true,
			message: "Buse updatedy successfully",
			data: buses,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
});

//delete bus
router.post("/delete-bus", authMiddleware, async (req, res) => {
	try {

		const buses = await Bus.findByIdAndDelete(req.body._id, req.body);
		console.log("DELETED ID", req.body._id);
		console.log("DELETED BODY", req.body);
		return res.status(200).send({
			success: true,
			message: "Buse Deleted successfully",
			data: buses,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
});

//get bus by id
router.post('/get-bus-by-id', authMiddleware, async (req, res) => {
	try {
		const bus = await Bus.findById(req.body._id);
		return res.status(200).send({
			success: true,
			message: "Bus fetch Successfully ",
			data: bus
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
});

module.exports = router;