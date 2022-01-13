var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Company Model
 * =============
 */

var Company = new keystone.List('Company', {
  label: 'О компании',
	autokey: { from: 'name', path: 'key', unique: true },
  nocreate: true,
  nodelete: true
});

Company.add({
	name: { label: 'Название', type: String, required: true },
	published: { label: 'Описание', type: Types.Html, wysiwyg: true },
	heroImage: { label: 'Фото', type: Types.CloudinaryImage, index: true },
  house: { label: 'Построенных дома', type: String },
  remont: { label: 'Законченных ремонтов', type: String },
  client: { label: 'Счастливых клиентов', type: String },
  result: { label: 'Награды', type: String }
});

Company.add( 'Что мы делаем',{
  imagework: {
    imageworkfoto: { label: 'Фото - Что мы делаем', type: Types.CloudinaryImage, index: true },
    imagework: { label: 'Описание - Что мы делаем', type: Types.Html, wysiwyg: true }
  }
});


Company.defaultColumns = 'name';
Company.register();
