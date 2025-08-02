import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import usersRoutes from "./src/routes/users.js";
import postsRoutes from "./src/routes/posts.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve frontend in production (before API routes)
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../client/dist"), {
      maxAge: "1d", // Cache static assets for 1 day
      etag: false,
    })
  );
}

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

// Basic route
app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  } else {
    res.json({ message: "ConnectSphere API is running!" });
  }
});

// Catch-all handler for frontend routes in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler (only for API routes in production)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
