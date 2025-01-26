const express = require('express');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

const logger = (req, res, next) => {
    console.log(`🟡 New request: ${req.method}, requested URL: ${req.originalUrl}`);
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req, res) => {
});

app.listen(PORT, () => {
    console.log(`🟢 Server is on. Listening on port ${PORT}`);
});