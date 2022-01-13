var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Portners Model
 * =============
 */

var Portners = new keystone.List('Portners', {
  label: 'Партнеры',
	autokey: { from: 'name', path: 'key', unique: true }
});

Portners.add({
	name: { label: 'Название', type: String, required: true },
  link: { label: 'Ссылка для перехода', type: String },
  heroImage: { label: 'Логотип', type: Types.CloudinaryImage }
});

Portners.defaultColumns = 'name';
Portners.register();
