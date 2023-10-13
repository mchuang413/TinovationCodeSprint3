import User from './authController.js';

const getUserUsername = async (userId) => {
    try {
      const user = await User.findOne({ userId: userId });
      if (user) {
        return user.username;
      }
      return null; // Return null if user not found
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error; // Handle the error appropriately in your application
    }
  };
  
  export default getUserUsername;
  