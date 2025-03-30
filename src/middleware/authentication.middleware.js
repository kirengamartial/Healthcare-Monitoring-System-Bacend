const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.header('x-auth-token');

  if (!token && req.headers.authorization) {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader.startsWith('Bearer ')) {
      token = bearerHeader.substring(7);
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};