var guidMap = 	{
	"ec05b6c5-87a8-4d7b-a42d-fc65f6efba9a": "img/shot-1.png",
	"6675c951-55f4-41f2-8ca3-75c262ecc964": "img/shot-2.png",
	"6959327b-a000-4492-9155-724f3dfaee78": "img/shot-3.png",
	"087aeaaa-e011-4e19-bbe2-7dcd594632a4": "img/shot-1.png",
	"daa37953-2a4c-47d7-8520-b11c4b5f1fbb": "img/shot-2.png",
	"9f35b89d-bce8-41dc-b121-e831cadc1e7e": "img/shot-3.png",
	"e210a37e-80ba-4303-bb47-f79858efbd44": "img/shot-1.png",
	"f850ad42-325c-4d20-bce5-3542f8eb57dc": "img/shot-2.png",
	"c16f46a8-fab5-4b8a-943a-5ed087522a39": "img/shot-3.png",
	"866bb6a7-65f5-44d0-9da3-cd6ff4060556": "img/shot-1.png"
};

//alert("start using ajax");
var elem = document.querySelector('.slider__content');
//var len = obj.length;

var xhr = new XMLHttpRequest();

xhr.open("GET", "api/app_package.json", true);

xhr.onreadystatechange = function(e) {
	if (xhr.readyState != 4) return;

	if (xhr.status != 200) {
		// обработать ошибку
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		try {
			var obj = JSON.parse(xhr.responseText);
		} catch (e) {
			alert("Некорректный ответ " + e.message);
		}
		Slides(obj);
	}
};

xhr.send();

function Slides (obj) {
	//console.log(guidMap);

	var pos = 22;
	var item = document.querySelector('.slider-nav__content');

	for (var i = 0; i < 7; i++) {

		var li = document.createElement('li');
		li.className = 'articles__block';

		var image = document.createElement('img');
		image.className = 'articles__block-img';
		image.src = guidMap[obj[i].guid];

		var title = document.createElement('div');
		title.className = 'articles__block-title';
		title.innerHTML = obj[i].title;

		var date = document.createElement('div');
		date.className = 'articles__block-data';

		var Data = new Date (obj[i].lastUpdate * 1000);

		var formatter = new Intl.DateTimeFormat("ru", {
			year: "numeric",
			month: "long",
			day: "numeric"
		});
		date.innerHTML = formatter.format(Data);

		elem.appendChild(li);
		li.appendChild(image);
		li.appendChild(title);
		li.appendChild(date);

		// добавление элементов для того чтобы слайдер прокручивался при нажатии на точку, я решил что стоит их тоже сделать динамическими
		var items = document.createElement('li');
		items.className = "item-links";
		items.setAttribute("data-pos", pos + 'rem');
		item.appendChild(items);

		pos -= 22;
	}

	var links = document.querySelectorAll('.item-links');
	var slider = document.querySelector('.slider__content');
	// activeLink обеспечивает метку для активного элемента
	var activeLink = 0;
	//console.log("links[i] = ", links);
	// устанавливаем отслеживание событий
	for (var i = 0; i < links.length; i++) {

		var link = links[i];
		link.addEventListener('click', setClickedItem, false);

		// определяем элемент для activeLink
		link.itemID = i;
	}

	// устанавливаем первый элемент в качестве активного
	// делаем проверку как со слайдером выше, чтобы не сыпало ошибками
	// а то у меня потом список для каталога приложений не хотел грузиться из-за этого
	if (slider) {
		links[activeLink].classList.add('item-links_active');
	}

	function setClickedItem(e) {
		removeActiveLinks();

		var clickedLink = e.target;
		activeLink = clickedLink.itemID;

		changePosition(clickedLink);
	}

	// удаление активной ячейки
	function removeActiveLinks() {
		for (var i = 0; i < links.length; i++) {
			links[i].classList.remove('item-links_active');
		}
	}
	// Обработчик изменяет позицию слайдера, после того, как мы убедились,
	// что в качестве активной обозначена нужная нам ссылка.
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

	//console.log("links.length = ", links.length);
	function Right() {
		for (var i = 0; i < links.length; i++) {
			if (links[i].classList.contains('item-links_active')) {

				// проверяем является ли слайд последним, если да, то присваиваем переменной item ноль чтобы перейти к самомму первому слайду
				// не совсем полноценный слайдер, но сделать лучше как-то не хватило мозгов
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
}

var apssMap = new XMLHttpRequest();

apssMap.open("GET", "api/app_list.json", true);

apssMap.onreadystatechange = function(e) {
	if (apssMap.readyState != 4) return;

	if (apssMap.status != 200) {
		// обработать ошибку
		alert(apssMap.status + ': ' + apssMap.statusText);
	} else {
		try {
			var appsObj = JSON.parse(apssMap.responseText);
		} catch (e) {
			alert("Некорректный ответ " + e.message);
		}
		Apps(appsObj);
	}
};

apssMap.send();


var elemApps = document.querySelector('.aside-catalog__list');

// вывод каталога приложений
function Apps (appsObj) {

	for (var i = 0; i < appsObj.length; i++) {
		var li = document.createElement('li');

		var link = document.createElement('a');
		link.className = 'aside-catalog__list_link';
		link.setAttribute("data-id", appsObj[i].id);
		link.href = '#';
		link.innerHTML = appsObj[i].title;

		elemApps.appendChild(li);
		li.appendChild(link);
	}
}

// огромная куча копипасты для динамической замены контента при клике на ссылку каталога приложений
var appInfo = new XMLHttpRequest();

appInfo.open("GET", "api/app_info.json", true);

appInfo.onreadystatechange = function(e) {
	if (appInfo.readyState != 4) return;

	if (appInfo.status != 200) {
		// обработать ошибку
		alert(appInfo.status + ': ' + appInfo.statusText);
	} else {
		try {
			var appInfoObj = JSON.parse(appInfo.responseText);
			//console.log(appInfoObj);
		} catch (e) {
			alert("Некорректный ответ " + e.message);
		}

		appInfoFunc(appInfoObj);
	}
};

appInfo.send();

var content = document.querySelector('.content');

function appInfoFunc(appInfoObj) {

	var appsList = document.querySelectorAll('.aside-catalog__list_link');

	var title = document.querySelector('.content__title');
	var date = document.querySelector('.app__date');
	var desc = document.querySelector('.app__desc');
	var require = document.querySelector('.app__require-desc');
	var image = document.querySelector('.app__image');
	var func = document.querySelector('.func__body');

	var activeApp = 0;

	if (appsList) {
		appsList[activeApp].classList.add('aside-catalog__list_link-active');
	}

	changePosition(appsList[activeApp]);

	for (var i = 0; i < appsList.length; i++) {

		var app = appsList[i];

		appsList[i].addEventListener('click', AppClickEvent, false);

		app.itemID = i;
	}

	function AppClickEvent(e) {
		removeActiveApps();

		var clickedApp = e.target;
		activeApp = clickedApp.itemID;

		changePosition(clickedApp);
	}

	// удаление активной ячейки
	function removeActiveApps() {

		for (var i = 0; i < appsList.length; i++) {
			appsList[i].classList.remove('aside-catalog__list_link-active');

		}

		// Наверное слишком жестко очищать весь блок с контентом,
		// но у нас же и так в конце будет все динамически формироваться, так почему бы и нет
		// поскольку в этот раз у меня не получилось выделить много времени на дз, пока решил откозаться от идеи отрисовывать весь блок
		//content.innerHTML = "";

		// удаляем все что есть в данных элементах
		title.innerHTML = "";
		date.innerHTML = "";
		desc.innerHTML = "";
		require.innerHTML = "";
		func.innerHTML = "";
		image.src = "";
	}

	function changePosition(app) {
		app.classList.add('aside-catalog__list_link-active');

		var id = app.getAttribute('data-id');

		//console.log(appInfoObj);

		for (var i = 0; i < appInfoObj.length; i++) {
			if (id == appInfoObj[i].id) {

				//contentFill();
				title.innerHTML = appInfoObj[i].title;

				// функция отдельная нужна
				var Data = new Date (appInfoObj[i].lastUpdate * 1000);

				var formatter = new Intl.DateTimeFormat("ru", {
					year: "numeric",
					month: "long",
					day: "numeric"
				});
				date.innerHTML = formatter.format(Data);

				desc.innerHTML = appInfoObj[i].description;

				require.innerHTML = appInfoObj[i].requirements;

				var li = document.createElement('li');

				var features = appInfoObj[i].features;
				//console.log(features.length);
				for (var j = 0; j < features.length; j++) {
					li.className = "func__item";
					li.innerHTML = features[j];
					func.appendChild(li.cloneNode(true));
				}
				image.src = guidMap[appInfoObj[i].guid];
			}
		}
	}
}

// function contentFill () {

// 	function append (divParrent, appendClass) {
// 		var div = document.createElement('div');
// 		div.className = appendClass;
// 		divParrent.appendChild(div);
// 	}


// 	var appendClass;

// 	appendClass = 'content__title';

// 	append (content, appendClass);

// 	appendClass = 'app';

// 	append (content, appendClass);
// 	divTitle.className = 'content__title';
// 	divTitle.innerHTML = appInfoObj[i].title;
// 	content.appendChild(divTitle);
// }