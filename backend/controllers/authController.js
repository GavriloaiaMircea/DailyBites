import bcrypt from "bcrypt";
import pool from "../db/db.js";
import jwt from "jsonwebtoken";
import session from "express-session";

// Funcție pentru generarea token-ului JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token valabil 1 zi
  );
};

// Înregistrarea utilizatorului
export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((existingUser) => {
      if (existingUser.rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Email is already registered." });
      }

      return bcrypt
        .genSalt(10)
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hashedPassword) => {
          return pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
          );
        })
        .then((newUser) => {
          const user = newUser.rows[0];

          // Generează token pentru utilizatorul nou si setează sesiunea
          const token = generateToken(user);
          req.session.user = {
            id: user.id,
            email: user.email,
            name: user.name,
          };

          res.status(201).json({
            message: "User created successfully!",
            token,
          });
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
};

// Login utilizator
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  pool.query("SELECT * FROM users WHERE email=$1", [email]).then((response) => {
    if (response.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = response.rows[0];
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generează token pentru utilizator si setează sesiunea
      const token = generateToken(user);
      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return res.status(200).json({
        message: "Login successful",
        token,
        session: req.session,
      });
    });
  });
};

// Obținerea utilizatorului curent
export const getCurrentUser = (req, res) => {
  const userId = req.user.id;

  pool
    .query("SELECT id, email, name FROM users WHERE id = $1", [userId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result.rows[0];
      res.json({ user });
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};
