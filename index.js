import express from "express"
import "dotenv/config"
import AuthRoute from "./src/routes/auth.route.js"
import UserRoute from "./src/routes/user.route.js"
import ChatRoute from "./src/routes/chat.route.js"
import { databaseConnection } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const PORT = process.env.PORT ;
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://z-chat-using-stream-frontend-zeta.vercel.app"
];

app.use(cors({
  origin: "*", // or a dynamic origin function
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// const ALLOWED_ORIGIN =
//   process.env.NODE_ENV === 'production'
//     ? 'https://app.example'
//     : '*';

// export async function OPTIONS() {
//   return new Response(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': allowedOrigins,
//       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Access-Control-Allow-Credentials': 'true',
//     },
//   });
// }

// export async function GET() {
//   return Response.json({ ok: true }, {
//     headers: { 'Access-Control-Allow-Origin': allowedOrigins },
//   });
// }


app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/chat", ChatRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Chat Application API");
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//   });
// }

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    databaseConnection()
})