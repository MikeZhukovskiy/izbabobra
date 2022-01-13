/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var secure = require('express-force-https');
const sm = require('sitemap');
var moment = require('moment');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

const sitemap = sm.createSitemap ({
  hostname: 'https://izbabobra.com',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: 'https://izbabobra.com', img: "https://izbabobra.com/images/logo.png", changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/company', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/shlifovka-srubov', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/otdelka-sten-v-srubakh', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/otdelke-potolkov-v-srubakh', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/otdelka-polov-v-srubakh', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/otdelka-proemov-ustanovka-okon-i-dverei', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/elektromontazhnye-raboty', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/krovelnye-raboty', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/price/dopolnitelnye-raboty', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/services/shlifovka-srubov', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/services/parnye-pod-klyuch', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/services/otdelochnye-raboty', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/services/krovelnye-raboty', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/services/elektromontazh', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/portfolio', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/contact', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/portfolio/family-park-dom-iz-kleenogo-prof-brusa', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/portfolio/parnaya-family-park', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0},
		{ url: 'https://izbabobra.com/portfolio/zheleznyi-vagona-stilnyi-khozblok', changefreq: 'hourly', lastmodISO: moment().format('YYYY-MM-DD'), priority: 1.0}
  ]
});

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.use(secure);
	app.get('/robots.txt', function (req, res) {
	    res.type('text/plain');
	    res.send("User-agent: *\nDisallow: /keystone/\nCrawl-delay: 3\nSitemap: https://izbabobra.com/sitemap.xml");
	});
	app.get('/sitemap.xml', function(req, res) {
  	sitemap.toXML( function (err, xml) {
	      if (err) {
	        return res.status(500).end();
	      }
	      res.header('Content-Type', 'application/xml');
	      res.send( xml );
	  });
	});
	app.all('/', routes.views.index);
	app.all('/gallery', routes.views.gallery);
	app.all('/company', routes.views.company);
	app.all('/price/:post', routes.views.price);
	app.all('/services/:post', routes.views.services);
	app.all('/portfolio', routes.views.portfolio);
	app.all('/portfolio/:post', routes.views.post);
	app.all('/contact', routes.views.contact);
	app.all('/search', routes.views.search);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
