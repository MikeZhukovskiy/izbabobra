var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sertificat Model
 * =============
 */

var Sertificat = new keystone.List('Sertificat', {
  label: 'Сертификаты',
	autokey: { from: 'name', path: 'key', unique: true }
});

Sertificat.add({
	name: { label: 'Имя', type: String, required: true },
  heroImage: { label: 'Фото', type: Types.CloudinaryImage, index: true },
  sort: { label: 'Порядок сортировки', type: String }
});

Sertificat.defaultColumns = 'name';
Sertificat.register();
