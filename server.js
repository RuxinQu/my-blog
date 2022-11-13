const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const passport = require('passport');
require('./util/passport');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 4001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(errorHandler());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(
    session({
        secret: 'dahuang',
        cookie: { maxAge: 172800000, secure: false, httpOnly: true, sameSite: 'strict' },
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize,
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const start = async () => {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
};

start();