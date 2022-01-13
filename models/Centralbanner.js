var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Centralbanner Model
 * =============
 */

var Centralbanner = new keystone.List('Centralbanner', {
  label: 'Центральный баннер',
	autokey: { from: 'name', path: 'key', unique: true },
  nocreate: true,
  nodelete: true
});

Centralbanner.add({
	name: { label: 'Название', type: String, required: true },
	content: { label: 'Описание', type: Types.Html }
});

Centralbanner.defaultColumns = 'name';
Centralbanner.register();
