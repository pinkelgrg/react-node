const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const cookie_session = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongo_uri);
const app = express();

app.use(
	cookie_session({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [ keys.cookie_keys ]
	})
);

app.use(passport.initialize());
app.use(passport.session());
//auth routes
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
