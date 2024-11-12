import express, { Express } from "express";
import snippetRouter from "./routes/snippetRoutes";

const port = 3000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", snippetRouter);

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
