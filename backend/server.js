require("dotenv").config();

const initDb = require("./src/database/initDb");
const express = require("express");
const motoRoutes = require("./src/routes/motoRoutes");

const app = express();

app.use(express.json());
app.use(motoRoutes);

const PORT = process.env.PORT || 3002;

async function startServer() {
    try {
        await initDb();

        app.listen(PORT, () => {
            console.log(`Api rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar a api", error);
        process.exit(1);
    }
}

startServer();