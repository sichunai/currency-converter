import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
const cors = cors();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get(
  "https://v6.exchangerate-api.com/v6/ee28c875c5b6be2f4dbc3d5d/latest/USD",
  (req, res) => {
    res.send("Good luck!");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
