const express = require('express');
const app = express();
const routes = require('./controllers')
const { engine } = require('express-handlebars')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler')
const sequelize = require('./config/connection');



app.use(errorHandler());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(routes)



const PORT = process.env.PORT || 4001;

const start = async () => {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
}

start();