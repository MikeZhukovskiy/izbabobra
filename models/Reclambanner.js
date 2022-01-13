var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Reclambanner Model
 * =============
 */

var Reclambanner = new keystone.List('Reclambanner', {
  label: 'Рекламный баннер',
	autokey: { from: 'name', path: 'key', unique: true },
  nocreate: true,
  nodelete: true
});

Reclambanner.add({
	name: { label: 'Название', type: String, required: true },
	heroImage: { label: 'Фото', type: Types.CloudinaryImage, index: true },
  text: { label: 'Текст рекламы', type: Types.Html },
  link: { label: 'Ссылка для перехода', type: String }
});

Reclambanner.defaultColumns = 'name';
Reclambanner.register();
