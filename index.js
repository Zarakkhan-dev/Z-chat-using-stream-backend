import express from "express";
// import "dotenv/config";
import AuthRoute from "./src/routes/auth.route.js";
import UserRoute from "./src/routes/user.route.js";
import ChatRoute from "./src/routes/chat.route.js";
import { databaseConnection } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://z-chat-using-stream-frontend-zeta.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/chat", ChatRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Chat Application API");
});

const startServer = async () => {
  try {
    await databaseConnection(); 
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1); 
  }
};

startServer();
