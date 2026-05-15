const { router } = require('./router.js');
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 3009;

class CatalogoComposicionAlimentos {

    static async connect() {
        console.log("USando app Catalogo");
        app.use('/', router);

        app.listen(PORT, () => {
            console.log(`Server Listen in port: http://localhost:${PORT}`);

        });

    }
}


module.exports = {
    CatalogoComposicionAlimentos
}
