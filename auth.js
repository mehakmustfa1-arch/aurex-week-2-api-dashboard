const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = decoded.id;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  } else {
    return res.status(401).json({ message: 'No Token' });
  }
};
module.exports = protect;