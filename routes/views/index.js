var keystone = require('keystone');
var API_KEY = 'cb3ee130eee43817af33f373508395e9-1df6ec32-2fffa473';
var DOMAIN = 'sandbox9d4ba7dc16e54a199ae3c643eefdb030.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const nodemailer = require("nodemailer");

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.enquirySubmitted2 = false;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';


	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Bannerindex').model.find().sort('sort');

		q.exec(function (err, result) {
			locals.bannerindex = result;
			if (result) {
				locals.bannerlength = result.length;
			}
			next(err);
		});

	});

	view.query('reclambanner', keystone.list('Reclambanner').model.find());

	view.query('centralbanner', keystone.list('Centralbanner').model.find());

	view.query('company', keystone.list('Company').model.find());

	view.query('portners', keystone.list('Portners').model.find());

	view.query('services', keystone.list('Services').model.find().sort('sort'));

	view.query('rewiev', keystone.list('Rewiev').model.find().sort('sort'));

	view.query('portfolio', keystone.list('Portfolio').model.find().sort('-publishedDate'));
	view.query('price', keystone.list('Price').model.find().sort('sort'));

	view.on('get',  function(next){
		 keystone.list('Information').model.find({
			 key: 'obshaya-informaciya'
		 }).exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			results.forEach(function(item, i, arr) {
				locals.title = item.titleindex;
				locals.description = item.descriptionindex;
			});
			locals.information = results;
			next();
		});
	});

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
	view.render('index');
};
