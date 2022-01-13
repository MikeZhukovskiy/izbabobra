var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Price Model
 * =============
 */

var Price = new keystone.List('Price', {
	label: 'Цены',
	autokey: { from: 'name', path: 'key', unique: true },
});

Price.add({
	name: { label: 'Название', type: String, required: true, text: true },
	publishedDate: { label: 'Дата создания', type: Types.Date, default: Date.now },
	textfooter: { label: 'Описание', type: Types.Html },
	published: { label: 'Цены BY', type: Types.Html, wysiwyg: true, height: 500 },
	publishedru: { label: 'Цены RU', type: Types.Html, wysiwyg: true, height: 500 },
	sort: { label: 'Сортировка в меню', type: String }
});

Price.defaultSort = 'sort';
Price.defaultColumns = 'name, publishedDate';
Price.register();
