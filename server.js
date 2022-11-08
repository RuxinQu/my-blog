const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler')
const sequelize = require('./config/connection')

app.use(errorHandler());
app.use(morgan('dev'));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4001;

const start = async () => {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
}

start();