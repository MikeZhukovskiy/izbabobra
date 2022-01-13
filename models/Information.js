var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Information Model
 * =============
 */

var Information = new keystone.List('Information', {
  label: 'Общая информация',
	autokey: { from: 'name', path: 'key', unique: true },
  nocreate: true,
  nodelete: true
});

Information.add({
	name: { label: 'Название', type: String, required: true },
  rus: { label: 'Цены в Рос. рублях', type: Types.Boolean },
	phone: { label: 'Главный номер телефона', type: String },
  phonemeneger: { label: 'Телефон менеджер', type: String },
  phonefax: { label: 'Тел/Факс', type: String },
  email: { label: 'Почта', type: String },
  adress: { label: 'Адрес', type: String },
  cart: { label: 'Код для карты (JavaScript)', type: Types.Code, language: 'js' },
  content: {
		vk: { label: 'Вконтакте', type: String },
		insta: { label: 'Инстаграмм', type: String },
    facebook: { label: 'Facebook', type: String },
    youtube: { label: 'Youtube', type: String },
    ok: { label: 'Ok', type: String }
	},
  textfooter: { label: 'Текст в подвале сайта', type: Types.Html },
  textbanner: { label: 'Текст в форме(Гл.Баннер)', type: Types.Html },
  textprimer: { label: 'Пример последних работ', type: Types.Html },
  textservice: { label: 'Основные услуги', type: Types.Html },
  textclient: { label: 'Счастливые клиенты', type: Types.Html },
  textwork: { label: 'Что мы делаем', type: Types.Html },
  textspec: { label: 'Наши специалисты', type: Types.Html },
  textsertificat: { label: 'Текст сертификаты', type: Types.Html },
  textcompanyfooter: { label: 'О компании(в подвале)', type: Types.Html },
  },'Для CEO',{
    titleindex: { label: 'Загаловок гл.страницы', type: String },
    descriptionindex: { label: 'Meta description', type: Types.Html }
});

Information.defaultColumns = 'name';
Information.register();
