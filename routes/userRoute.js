const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const { findOne } = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//register new user

router.post('/register', async (req, res) => {
	try {

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			return res.send({
				message: 'User Already Exists',
				success: false,
				data: null
			});
		}
		const hashedPass = await bcrypt.hash(req.body.password, 10);
		req.body.password = hashedPass;
		const newUser = new User(req.body);
		await newUser.save();
		res.send({
			message: 'User Created Sucessfully',
			success: true,
			data: null
		});
	} catch (error) {
		res.send({
			message: error.message,
			success: false,
			data: null
		});
	}
});

//LOGIN NEW USER

router.post('/login', async (req, res) => {
	try {
		const existedUser = await User.findOne({ email: req.body.email });
		if (!existedUser) {
			return res.send({
				message: 'User does not exists',
				success: false,
				data: null
			});
		}

		const matchedPassword = await bcrypt.compare(req.body.password, existedUser.password);

		if (!matchedPassword) {
			return res.send({
				message: "Incurrect password",
				success: false,
				data: null
			});
		}

		const token = jwt.sign({ userId: existedUser._id }, process.env.jwt_secret, { expiresIn: "1d" });

		res.send({
			message: 'User logged in Sucessfully',
			success: true,
			data: token
		});

	} catch (error) {
		res.send({
			message: error.message,
			success: false,
			data: null
		});
	}
});

router.post('/get-user-by-id', authMiddleware, async (req, res) => {

	try {
		const user = await User.findById(req.body.userId);
		if (!user) {
			return res.status(401).send({ messege: 'UNAUTHORIZED' });
		}
		res.send({
			message: "Users fetched successfully",
			success: true,
			data: user,
		});

	} catch (error) {
		console.log("USER FETCH ERRORS");
		res.status(401).send({
			message: 'UNAUTHORISED',
			success: false,
			data: null
		});
	}
});

module.exports = router

