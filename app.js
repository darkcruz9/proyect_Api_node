const { router } = require('./catalogoComposicionAlimentos/router.js');
const express = require('express');


const app = express();

app.use(express.json());

const PORT = process.env.PORT ?? 3009;

console.log("API AppNutriconal MEAN");

//Endpoints
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server Listen in port: http://localhost:${PORT}`);

});

