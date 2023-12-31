require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./routes/auth-route");
const contactRoute = require("./routes/contact-route");
const connectDB = require("./db/dbConfig");
const errorMiddleware = require("./middleware/error-middleware");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
