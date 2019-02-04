var express = require('express')
    app = express();
    _ = require('lodash');
    bodyParser = require('body-parser');
    mongoose = require('./db/mongoose');
    indexRoutes = require("./routes/index"),   //requiring routes
    SupplyRoutes = require("./routes/supply"),
    demandRoutes = require("./routes/demand"),
    bookRouthes =require("./routes/book"),
    keys = require('./config/keys');
    port = keys.port;

app.use(bodyParser.json());

app.use("/api", indexRoutes);
app.use("/api/supply",SupplyRoutes);

app.listen(port, () => console.log(`Parking app listening on port ${port}!`))