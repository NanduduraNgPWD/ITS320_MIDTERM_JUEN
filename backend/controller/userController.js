
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'; 

async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" }); 
    }
}

// @desc    Update user profile

  // @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private

async function getUserProfile(req,res){
    try {
      const user = await User.findById(req.params.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('User profile error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

async function createUser(req,res){
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.send('Please fill out all fields')
    }
    // const exists = User.findOne({username})
    // if (exists) {
    //     res.status(409).send('Username already exists')
    //     throw new Error('Username alreadty exists')
    // }
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = await User.create({
    username,
    email,
    password: hashedPassword
});

    if (!newUser) {
        res.status(500).send('Error while creating user')
    }

    return res.status(200).send('User successfully created.')
}


export {createUser, getUsers, getUserProfile};