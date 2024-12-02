import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else if (req.session?.user) {
    req.user = req.session.user;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized: Please log in." });
  }
};
