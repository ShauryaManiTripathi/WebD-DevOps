import Reader from '../models/Reader.js';
import Librarian from '../models/Librarian.js';
import { generateToken } from '../config/auth.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, userType, employeeId, department } = req.body;

    // Check if user already exists
    const userExists = await Reader.findOne({ email }).select('-__v') || 
                      await Librarian.findOne({ email }).select('-__v');

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    let user;
    
    // Create user based on userType
    if (userType === 'Reader') {
      user = await Reader.create({
        name,
        email,
        password,
        role: 'reader',
        userType: 'Reader',
      });
    } else if (userType === 'Librarian') {
      // Validate librarian specific fields
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID is required for librarians',
        });
      }
      
      user = await Librarian.create({
        name,
        email,
        password,
        role: 'librarian',
        userType: 'Librarian',
        employeeId,
        department: department || 'Circulation',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type',
      });
    }

    // Create token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        userType: user.userType
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/signin
// @access  Public
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = (await Reader.findOne({ email }).select('+password')) || 
                (await Librarian.findOne({ email }).select('+password'));

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        userType: user.userType
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await Reader.findById(req.user.id).select('-__v') || 
                await Librarian.findById(req.user.id).select('-__v');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
