// controllers/userController.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashedPassword });
    generateToken(res, user._id);
    res.status(201).json({ message: 'User registered successfully', user });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    generateToken(res, user._id);
    res.status(200).json({ message: 'User logged in successfully', user });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'User logged out successfully' });
};

export { registerUser, loginUser, logoutUser };
