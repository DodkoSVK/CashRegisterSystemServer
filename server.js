const express = require('express');
require('dotenv').config();
const { logger } = require('./src/controllers/genericController');
const barsRouter = require('./src/routes/barsRouter');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
// Routers
app.use("/api/bars", barsRouter);

app.listen(PORT, () => {
    console.log(`🟢 Server is on. Listening on port ${PORT}`);
});