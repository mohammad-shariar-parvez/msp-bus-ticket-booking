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
		console.log("FROM SERVER BUSES", req.body);
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
		console.log("UPDATE ID", req.body._id);
		console.log("UPDATE BODY", req.body);
		return res.status(200).send({
			success: true,
			message: "Buse updated successfully",
			data: buses,
		});
	} catch (error) {
		res.status(500).send({ success: false, message: error.message });
	}
});



module.exports = router;