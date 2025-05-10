import Reader from '../models/Reader.js';
import Librarian from '../models/Librarian.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Librarians only)
export const getUsers = async (req, res) => {
  try {
    // Build query
    const query = {};
    
    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Get users depending on type
    let users = [];
    let total = 0;
    
    if (req.query.userType === 'Reader') {
      users = await Reader.find(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
      total = await Reader.countDocuments(query);
    } else if (req.query.userType === 'Librarian') {
      users = await Librarian.find(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
      total = await Librarian.countDocuments(query);
    } else {
      // Get both types
      const readers = await Reader.find(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
      const librarians = await Librarian.find(query)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);
      
      users = [...readers, ...librarians].sort((a, b) => 
        b.createdAt - a.createdAt
      ).slice(0, limit);
      
      total = await Reader.countDocuments(query) + await Librarian.countDocuments(query);
    }
    
    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Librarians only)
export const getUser = async (req, res) => {
  try {
    // Try to find user in both collections
    const user = await Reader.findById(req.params.id) || 
                await Librarian.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, email, address, phoneNumber, specialty } = req.body;
    
    let user;
    
    // Find user based on their type
    if (req.user.userType === 'Reader') {
      user = await Reader.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      
      // Update reader specific fields
      user.name = name || user.name;
      user.email = email || user.email;
      
      // Update address if provided
      if (address) {
        user.address = {
          ...user.address,
          ...address,
        };
      }
      
      // Update phone number if provided
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
    } else if (req.user.userType === 'Librarian') {
      user = await Librarian.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      
      // Update librarian specific fields
      user.name = name || user.name;
      user.email = email || user.email;
      
      // Update specialty if provided
      if (specialty) {
        user.specialty = specialty;
      }
    }
    
    // Save updated user
    await user.save();
    
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
