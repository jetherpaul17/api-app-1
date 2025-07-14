const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};