//Check if environment is production or dev
if (process.env.NODE_ENV === 'production') {
	//We are on production. Return prod env variables.
	module.exports = require('./prod');
} else {
	//We are on dev. Return dev env variables.
	module.exports = require('./dev');
}
