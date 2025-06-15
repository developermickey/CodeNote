import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

import rateLimitor from "./middleware/rateLimitor.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
  origin: "http://localhost:5173", // Remove trailing slash
  credentials: true
}));
app.use(express.json());

app.use(rateLimitor);


app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("Server Runing on PORT 5001");
});
})


