const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 4001;

app.use(
    session({
        secret: "dahuang",
        cookie: { maxAge: 172800000, secure: true, sameSite: "none" },
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize,
        }),
    })
);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(errorHandler());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(routes)

const start = async () => {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
}

start();