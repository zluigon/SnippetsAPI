import express, { Express } from "express";

const app: Express = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
