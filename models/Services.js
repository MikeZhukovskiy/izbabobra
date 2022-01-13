var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Services Model
 * =============
 */

var Services = new keystone.List('Services', {
  label: 'Основные услуги',
	autokey: { from: 'name', path: 'key', unique: true },
});

Services.add({
  name: { label: 'Название', type: String, required: true },
	published: { label: 'Наименование услуги', type: String },
	heroImage: { label: 'Фото', type: Types.CloudinaryImage, index: true },
  images: { label: 'Дополнительное фото', type: Types.CloudinaryImages },
  priceby: { label: 'Цена в BY', type: String },
  priceru: { label: 'Цена в RU', type: String },
  content: {
		extended: { label: 'Полное описание', type: Types.Html, wysiwyg: true, height: 400 },
	},
	information: { label: 'Информация BY', type: Types.Html, wysiwyg: true, height: 250 },
	information2: { label: 'Информация RU', type: Types.Html, wysiwyg: true, height: 250 },
  sort: { label: 'Порядок сортировки', type: String }
});

Services.defaultColumns = 'name, sort';
Services.register();
