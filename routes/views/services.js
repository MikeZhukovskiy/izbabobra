var keystone = require('keystone');
var API_KEY = 'cb3ee130eee43817af33f373508395e9-1df6ec32-2fffa473';
var DOMAIN = 'sandbox9d4ba7dc16e54a199ae3c643eefdb030.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const nodemailer = require("nodemailer");

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'services';

	locals.title = 'Услуги';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	view.query('information', keystone.list('Information').model.find());
	view.query('specialist', keystone.list('Specialist').model.find().sort('sort'));
	view.query('portners', keystone.list('Portners').model.find());
	view.query('rewiev', keystone.list('Rewiev').model.find());
	view.query('centralbanner', keystone.list('Centralbanner').model.find());
	view.query('services', keystone.list('Services').model.find().sort('sort'));


	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Services').model.findOne({
			key: locals.filters.post
		});

		q.exec(function (err, result) {
			locals.data.post = result;
			if (result) {
				locals.title = result.name;
			}
			next(err);
		});

	});


	view.query('price', keystone.list('Price').model.find());

	view.on('post', { action: 'subscriber' }, function(next){

		let testAccount = nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'zhukovskiymike88@gmail.com',
				pass: 'Do!051016juk',
			},
		});

		// send mail with defined transport object
		let info = transporter.sendMail({
			from: '"Izba Bobra" <izbabobra@gmail.com>', // sender address
			to: "izbabobra@gmail.com", // list of receivers
			subject: "✔ Заказ звонка с сайта ✔", // Subject line
			html:`
				<h4>Имя: ${req.body.name}</h4>
				<h4>Телефон: ${req.body.phone}</h4>
				<h4>Сообщение: ${req.body.text}</h4>
			`,
		});

		next();
	});

	view.on('post', { action: 'pointment' }, function(next){

		let testAccount = nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'zhukovskiymike88@gmail.com',
				pass: 'Do!051016juk',
			},
		});

		// send mail with defined transport object
		let info = transporter.sendMail({
			from: '"Izba Bobra" <izbabobra@gmail.com>', // sender address
			to: "izbabobra@gmail.com", // list of receivers
			subject: "✔ Оставили email на сайте ✔", // Subject line
			html:`
				<h4>Email: ${req.body.email}</h4>
			`,
		});

		next();
	});


	// Render the view
	view.render('services');

};
