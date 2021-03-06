const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require("./app/models/");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("cannot connect to db", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Smart Waste Management System (SWMS)",
  });
});

require("./app/routes/user.Routes")(app);
require("./app/routes/trashdataRoutes")(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
