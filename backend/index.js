import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, //10minute
  })
);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", searchRoutes);

app.get("/", (req, res) => {
  res.send("Serverul este funcțional!");
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
