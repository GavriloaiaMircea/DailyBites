import bcrypt from "bcrypt";
import pool from "../db/db.js";

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
          res.status(201).json({
            message: "User created successfully!",
            user: newUser.rows[0],
          });
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
};
