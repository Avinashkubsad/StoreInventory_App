const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const itemRoutes = require("./routes/itemsRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

app.use("/api/items", itemRoutes);
app.use("/api/purchase", purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
