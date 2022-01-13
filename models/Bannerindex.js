var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Bannerindex Model
 * =============
 */

var Bannerindex = new keystone.List('Bannerindex', {
  label: 'Главный баннер',
	autokey: { from: 'name', path: 'key', unique: true }
});

Bannerindex.add({
	name: { label: 'Название', type: String, required: true },
	content: { label: 'Описание', type: Types.Html },
  link: { label: 'Ссылка для перехода', type: String },
  heroImage: { label: 'Картинка', type: Types.CloudinaryImage },
  sort: { label: 'Порядок сортировки', type: String }
});

Bannerindex.defaultColumns = 'name';
Bannerindex.register();
