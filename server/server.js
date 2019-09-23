require("./config/config");

const express = require("express");
const cors = require("cors");
const bodyparse = require("body-parser");

const app = express();

app.use(bodyparse.urlencoded({ extended: false }));

app.use(bodyparse.json());

app.use(cors());

app.use(require('./routers/routers'));

app.listen( process.env.PORT, () => {
    console.log('corriendo en el PORT', process.env.PORT);
} );
