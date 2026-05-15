const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');

// Override HTTP methods with POST having ?_method=DELETE/PUT
app.use(methodOverride('_method'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Load environment variables
require('dotenv').config();
// CI/CD Fallback: If PORT is not in .env (like in GitHub Actions), use 3000
const port = process.env.PORT || 3000;

// Database Connection
const database = require("./config/database");
if (process.env.NODE_ENV !== 'test') {
    database.conect();
}

// Setup View Engine (Pug)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Setup Static Files (Public folder & TinyMCE)
app.use(express.static(`${__dirname}/public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Import System Configurations & Routes
const systemConfig = require("./config/system");
const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");

// Setup Cookies, Sessions, and Flash Messages
app.use(cookieParser('khjf'));
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'secret-key-tuy-y',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false 
}));
app.use(flash());

// Make admin prefix available globally in views
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Initialize Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});
routeAdmin(app);
routeClient(app);


// CI/CD SETUP
if (require.main === module) {
    app.listen(port, () => {
        console.log(`[Server] App is successfully listening on port ${port}`);
    });
}

module.exports = app;