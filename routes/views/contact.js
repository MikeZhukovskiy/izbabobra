var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var API_KEY = '7ac1c72fee76909de7fe12a070a9075b-76f111c4-3b1b6678';
var DOMAIN = 'sandbox4deda49df2354dfdb817816fbd743c31.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const nodemailer = require("nodemailer");

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.title = 'Контакты';

	view.query('information', keystone.list('Information').model.find());
	view.query('services', keystone.list('Services').model.find().sort('sort'));
		view.query('price', keystone.list('Price').model.find().sort('sort'));

	// On POST requests, add the Enquiry item to the database
	// view.on('post', { action: 'contact' }, function (next) {
	//
	// 	var newEnquiry = new Enquiry.model();
	// 	var updater = newEnquiry.getUpdateHandler(req);
	//
	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		fields: 'name, email, message',
	// 		errorMessage: 'Произошла ошибка при отправке сообщения:',
	// 	}, function (err) {
	// 		if (err) {
	// 			locals.validationErrors = err.errors;
	// 		} else {
	// 			locals.enquirySubmitted = true;
	// 		}
	// 		next();
	// 	});
	// });

	view.on('post', { action: 'contact' }, function(next){

		function main() {
		  // Generate test SMTP service account from ethereal.email
		  // Only needed if you don't have a real mail account for testing
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
		    subject: "✔ Сообщение с сайта ✔", // Subject line
				html:`
					<h4>Имя: ${req.body.tel}</h4>
		    	<h4>Почта: ${req.body.email}</h4>
					<h4>Сообщение: ${req.body.message}</h4>
				`,
		  });
			locals.enquirySubmitted = true;
		  next();
		}

		main();

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



	view.render('contact');
};
