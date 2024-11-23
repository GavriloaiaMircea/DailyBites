import bcrypt from "bcrypt";
import pool from "../db/db.js"; // Importă conexiunea la baza de date

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifică dacă utilizatorul există deja
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash-uiește parola
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserează utilizatorul în baza de date
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
