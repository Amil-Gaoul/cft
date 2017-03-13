// массив объектов для слайдера на главной странице
var obj = [
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-1.png",
		class_title: "articles__block-title",
		tit: "Стандартный пакет",
		class_date: "articles__block-data",
		date: "08 апреля 2012"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-2.png",
		class_title: "articles__block-title",
		tit: "Новый цфт-банк",
		class_date: "articles__block-data",
		date: "09 сентября 2016"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-3.png",
		class_title: "articles__block-title",
		tit: "Каталог разработок",
		class_date: "articles__block-data",
		date: "03 марта 2015"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-1.png",
		class_title: "articles__block-title",
		tit: "Стандартный пакет",
		class_date: "articles__block-data",
		date: "08 апреля 2012"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-2.png",
		class_title: "articles__block-title",
		tit: "Новый цфт-банк",
		class_date: "articles__block-data",
		date: "09 сентября 2016"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-3.png",
		class_title: "articles__block-title",
		tit: "Каталог разработок",
		class_date: "articles__block-data",
		date: "03 марта 2015"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-1.png",
		class_title: "articles__block-title",
		tit: "Стандартный пакет",
		class_date: "articles__block-data",
		date: "08 апреля 2012"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-2.png",
		class_title: "articles__block-title",
		tit: "Новый цфт-банк",
		class_date: "articles__block-data",
		date: "09 сентября 2016"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-3.png",
		class_title: "articles__block-title",
		tit: "Каталог разработок",
		class_date: "articles__block-data",
		date: "03 марта 2015"
	},
	{
		class_parrent: "articles__block",
		class_image: "articles__block-img",
		image: "img/shot-1.png",
		class_title: "articles__block-title",
		tit: "Стандартный пакет",
		class_date: "articles__block-data",
		date: "08 апреля 2012"
	}
];

// массив объектов для списка приложений
var apps = [
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Стандартный пакет"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Новый ЦФТ-Банк"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Cash Management"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Аренда сейфов"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Банковские гарантии"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Казначейство"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Страхование"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Факторинговое обслуживание"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Переводы средств"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Расчетный центр"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Пластиковые карты"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Финансовый мониторинг"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Депозиты и вклады"
	},
	{
		class_element: "aside-catalog__list_link",
		href: "#",
		link_title: "Инвестиции"
	}
];

var elem = document.querySelector('.slider__content');
var len = obj.length;

function Slides () {

	var i = 0;
	var pos = 22;
	var item = document.querySelector('.slider-nav__content');

	for (; i < len; i++) {
		if (i !== 7) {
			var li = document.createElement('li');
			li.className = obj[i].class_parrent;

			var image = document.createElement('img');
			image.className = obj[i].class_image;
			image.src = obj[i].image;

			var title = document.createElement('div');
			title.className = obj[i].class_title;
			title.innerHTML = obj[i].tit;

			var date = document.createElement('div');
			date.className = obj[i].class_date;
			date.innerHTML = obj[i].date;

			elem.appendChild(li);
			li.appendChild(image);
			li.appendChild(title);
			li.appendChild(date);

			// добавление элементов для того чтобы слайдер прокручивался при нажатии на точку,
			// я решил что стоит их тоже сделать динамическими
			var items = document.createElement('li');
			items.className = "item-links";
			items.setAttribute("data-pos", pos + 'rem');
			item.appendChild(items);

			pos -= 22;
		} else {
			break;
		}
	}
}

if (elem) {
	Slides();
}


var links = document.querySelectorAll('.item-links');
var slider = document.querySelector('.slider__content');

var activeLink = 0;
//console.log("links[i] = ", links);
for (var i = 0; i < links.length; i++) {
	var link = links[i];

	link.addEventListener('click', setClickedItem, false);

	link.itemID = i;
}

if (slider) {
	links[activeLink].classList.add('item-links_active');
}

function setClickedItem(e) {
	removeActiveLinks();

	var clickedLink = e.target;
	activeLink = clickedLink.itemID;

	changePosition(clickedLink);
}

function removeActiveLinks() {
	for (var i = 0; i < links.length; i++) {
		links[i].classList.remove('item-links_active');
	}
}

function changePosition(link) {
	link.classList.add('item-links_active');

	var position = link.getAttribute('data-pos');
	elem.style.left = position;
}

// перелистывание слайдов по клику на стрелку "вправо"
var navRight = document.querySelector('.articles__next');

if (navRight) {
	navRight.addEventListener('click', Right, false);
}

console.log("links.length = ", links.length);
function Right() {
	for (var i = 0; i < links.length; i++) {
		if (links[i].classList.contains('item-links_active')) {

			// проверяем является ли слайд последним, если да, то присваиваем переменной item ноль чтобы перейти к самомму первому слайду
			if (i === links.length - 1) {
				var item = 0;
			} else {
				var item = i + 1;
			}
		}
	}
	removeActiveLinks();
	changePosition(links[item]);
}

// аналогично только теперь влево
var navLeft = document.querySelector('.articles__prev');

if (navLeft) {
	navLeft.addEventListener('click', Left, false);
}

function Left() {
	for (var i = 0; i < links.length; i++) {
		if (links[i].classList.contains('item-links_active')) {
			if (i === 0) {
				var item = links.length - 1;
			} else {
				var item = i - 1;
			}
		}
	}
	removeActiveLinks();
	changePosition(links[item]);
}



var elemApps = document.querySelector('.aside-catalog__list');
var ln = apps.length;

// вывод каталога приложений
function Apps () {

	var i = 0;
	for (; i < ln; i++) {
		var li = document.createElement('li');

		var link = document.createElement('a');
		link.className = apps[i].class_element;
		link.href = apps[i].href;
		link.innerHTML = apps[i].link_title;

		elemApps.appendChild(li);
		li.appendChild(link);
	}
}

if (elemApps) {
	Apps();
}