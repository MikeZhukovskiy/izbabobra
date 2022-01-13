var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Specialist Model
 * =============
 */

var Specialist = new keystone.List('Specialist', {
  label: 'Наши специалисты',
	autokey: { from: 'name', path: 'key', unique: true }
});

Specialist.add({
	name: { label: 'Имя', type: String, required: true },
  link: { label: 'Специализация', type: String },
  heroImage: { label: 'Картинка', type: Types.CloudinaryImage },
  sort: { label: 'Порядок сортировки', type: String }
});

Specialist.defaultColumns = 'name';
Specialist.register();
