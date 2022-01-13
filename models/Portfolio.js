var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Portfolio Model
 * =============
 */

var Portfolio = new keystone.List('Portfolio', {
	label: 'Портфолио',
	autokey: { from: 'name', path: 'key', unique: true },
});

Portfolio.add({
	name: { label: 'Название', type: String, required: true },
	published: { label: 'Адрес расположения дома', type: String },
	publishedDate: { label: 'Дата', type: Types.Date, index: true },
	image: { label: 'Главное фото', type: Types.CloudinaryImage },
	images: { label: 'Дополнительное фото', type: Types.CloudinaryImages },
	priceby: { label: 'Цена в BY', type: String },
  priceru: { label: 'Цена в RU', type: String },
	content: {
		brief: { label: "Краткое описание", type: Types.Html, wysiwyg: true, height: 100 },
		extended: { label: 'Полное описание', type: Types.Html, wysiwyg: true, height: 400 },
	},
	information: { label: 'Информация BY', type: Types.Html, wysiwyg: true, height: 250 },
	information2: { label: 'Информация RU', type: Types.Html, wysiwyg: true, height: 250 }
});

Portfolio.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Portfolio.defaultColumns = 'name, publishedDate|20%';
Portfolio.register();
