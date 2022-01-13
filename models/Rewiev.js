var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Rewiev Model
 * =============
 */

var Rewiev = new keystone.List('Rewiev', {
  label: 'Отзывы',
	autokey: { from: 'name', path: 'key', unique: true }
});

Rewiev.add({
	name: { label: 'Имя', type: String, required: true },
	content: { label: 'Отзыв', type: Types.Html },
  heroImage: { label: 'Фото', type: Types.CloudinaryImage, index: true },
  sort: { label: 'Порядок сортировки', type: String }
});

Rewiev.defaultColumns = 'name';
Rewiev.register();
