import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

/* import routes */
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";
import examQuestionRoutes from "./routes/ExamQuestionRoutes.js";
import examRoutes from "./routes/ExamRoutes.js";
import examResultRoutes from "./routes/ExamResultRoutes.js";
import compilationRoutes from "./routes/compilationRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// TODO: change this to upload to firebase
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/v1/questions", examQuestionRoutes);
app.use("/api/v1/exams", examRoutes);
app.use("/api/v1/results", examResultRoutes);
/**api route  */
app.use('/api/v1/compilations', compilationRoutes);
app.use("/api/v1/users/",userRoutes);

//TODO: testing routes
app.get("/", (req, res) => {
  res.send("Hello World! NO Authorization required");
});

app.get("/api/student", verifyToken, (req, res) => {
  // res.send(`Hello World!, Authorization required, ROLE: ${req.role}`);
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
mongoose // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
