/*/const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Auth Header:', authHeader); // Log the full auth header
  console.log('Token:', token); // Log token to verify it's present

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assign the entire decoded token to req.user
    console.log('Decoded Token:', decoded); // Log the decoded token
    next();
  } catch (error) {
    console.error('Token Verification Failed:', error.message); // Log verification error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};



/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication credentials are missing' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token must be Bearer token' });
    }

    const token = authHeader.split(' ')[1];
    
    // Simply verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    
    // Let the request continue
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};*/



const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication credentials are missing' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token must be Bearer token' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check for admin role
    if (decoded.role === 'admin') {
      req.user = decoded; // Attach the decoded token to req.user
      console.log('Admin Token Decoded:', decoded); // Log for admin verification
      return next(); // Continue to the next middleware/route handler for admin
    }
    
    // If not an admin, treat as a user and validate userId format
    const userId = decoded.userId; // Assuming decoded contains the userId

    if (!userId || !/^[a-zA-Z0-9]{24}$/.test(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    req.user = { userId }; // Attach user ID to req.user
    console.log('User Token Decoded:', decoded); // Log for user verification
    next(); // Continue to the next middleware/route handler for user
  } catch (error) {
    console.error('Token Verification Failed:', error.message); // Log any error during verification

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};
