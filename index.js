const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

require('dotenv').config();
const port = process.env.PORT;

const database = require("./config/database");
database.conect();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");

app.use(cookieParser('khjf'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

routeAdmin(app);
routeClient(app);

app.locals.prefixAdmin = systemConfig.prefixAdmin;





app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})