const express = require("express");
const bodyParser = require("body-parser");
const readExcelFile = require("./utils/readExcelFile");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// body parser to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTES

// app.post("/postFile",(req,res)=>{
//     const data=req.body;
// });

// ["code", "description", "brand", "iva", "price"]

const taladroRouter = require("./routes/taladroRoute");
const trebolRouter = require("./routes/trebolRoute");
const ciardiRouter = require("./routes/ciardiRoute");
const cerrajeriaRouter = require("./routes/cerrajeriaRoute");
const pauloRouter = require("./routes/pauloRoute");
const nexoRouter = require("./routes/nexoRoute");
const jmRouter = require("./routes/jmRoute");
const fgRouter = require("./routes/fgRoute");
const lucciniRouter = require("./routes/lucciniRoute");
const foxsRouter = require("./routes/foxsRoute");
const bethularRouter = require("./routes/bethularRoute");
const sergioRouter = require("./routes/sergioRoute");
const afipRouter = require("./routes/afipRoute");

app.use("/api/productos", taladroRouter);
app.use("/api/productos", trebolRouter);
app.use("/api/productos", ciardiRouter);
app.use("/api/productos", cerrajeriaRouter);
app.use("/api/productos", pauloRouter);
app.use("/api/productos", nexoRouter);
app.use("/api/productos", fgRouter);
app.use("/api/productos", lucciniRouter);
app.use("/api/productos", bethularRouter);
app.use("/api/productos", sergioRouter);
app.use("/api/productos", foxsRouter);
app.use("/api/productos", jmRouter);
app.use("/api", afipRouter);
app.get("/", (req, res) => {
  res.send("success");
});

// start server
const Port = process.env.PORT || 3002;
app.listen(Port, () => {
  console.log(`Listening in port ${process.env.PORT}`);
});
