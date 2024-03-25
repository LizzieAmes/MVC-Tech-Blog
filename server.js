const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

const app = express();
const PORT = 3002;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

