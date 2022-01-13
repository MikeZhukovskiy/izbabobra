var keystone = require('keystone');
var Post = keystone.list('Post');
var API_KEY = 'e491b43abbd935ff964373593a96a985-87cdd773-8b0b2e85';
var DOMAIN = 'sandboxfe36e0fc9e28432c9464d3f52a713b5b.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const nodemailer = require("nodemailer");


exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.filters = {
    keywords: req.query.keywords,
  };
  locals.data = {
    postcategory: [],
    posts: [],
    keywords: "",
  };

  locals.title = 'Поиск по сайту';

  view.query('information', keystone.list('Information').model.find());
  view.query('price', keystone.list('Price').model.find());
  view.query('services', keystone.list('Services').model.find().sort('sort'));

  // Load the current product
  view.on('init', function(next) {
    locals.data.keywords = locals.filters.keywords;

    //search the full-text index
    keystone.list('Price').model.find(
      { $text : { $search : locals.filters.keywords } },
      { score : { $meta: "textScore" } }
    ).sort({ score : { $meta : 'textScore' } }).
      exec(function(error, results) {
         locals.data.posts = results;
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
  view.render('search');

};
