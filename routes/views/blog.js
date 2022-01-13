var keystone = require('keystone');
var async = require('async');
var API_KEY = 'cb3ee130eee43817af33f373508395e9-1df6ec32-2fffa473';
var DOMAIN = 'sandbox9d4ba7dc16e54a199ae3c643eefdb030.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const nodemailer = require("nodemailer");

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	view.query('information', keystone.list('Information').model.find());
	view.query('services', keystone.list('Services').model.find().sort('sort'));

	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
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
	view.render('blog');
};
