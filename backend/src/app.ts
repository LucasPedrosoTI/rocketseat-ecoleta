import express from "express";
import cors from "cors";
import router from "./routes/routes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.use("/", router);
export default app;
