(function () {
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
		"866bb6a7-65f5-44d0-9da3-cd6ff4060556": "img/shot-1.png",
		"9aab566b-5af6-4329-8779-1d604fd12be7": "img/shot-2.png",
		"4ed5e519-adcd-4b9b-a9ac-2baabe006544": "img/shot-3.png",
		"a7de488b-1782-49b4-a19f-19806be347e1": "img/shot-1.png",
		"f4eb162c-4eef-4f61-a961-55faaf91ffb2": "img/shot-2.png",
		"f60e67ae3-b697-4452-a749-fcbd0ba91e2a": "img/shot-3.png"
	};

	// сразу грузим главную страницу
	var insertMainPage = document.querySelector('.page');
	var clonePage = document.querySelector('.main-page').content;

	insertMainPage.appendChild(clonePage.cloneNode(true));

	var package = "api/app_package.json",
		apssMap = "api/app_list.json",
		appInfo = "api/app_info.json";

	loadData(package).then(
		function(result) {
			Slides(result);
		}
	);

	var indexPage = document.querySelectorAll('.navbar__menu-link');

	for (var p = 0; p < indexPage.length; p++) {
		var mainPage = indexPage[p];
		mainPage.addEventListener('click', turnMainPage, false);
	}

	function turnMainPage(e) {
		var page = e.target;
		var index = page.getAttribute('data-main');

		insertPage(index);
	}

	function insertPage(index) {
		var insert = document.querySelector('.page');
		if (index == 1) {
			var mainPage = document.querySelector('.main-page').content;
			insert.innerHTML = "";
			insert.appendChild(mainPage.cloneNode(true));
			loadData(package).then(
				function(result) {
					Slides(result);
				}
			);
		} else if (index == 2) {
			var catalogPage = document.querySelector('.catalog-page').content;
			insert.innerHTML = "";
			insert.appendChild(catalogPage.cloneNode(true));

			loadData(apssMap).then(
				function(result) {
					Apps(result);
				}
			);
			loadData(appInfo).then(
				function(result) {
					appInfoFunc(result);
				}
			);
		}
	}

	// функция для загрузки JSON-файлов

	function loadData(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState != 4) return;

				if (xhr.status != 200) {
					// обработать ошибку
					reject("Error!!!");
				} else {
					resolve(JSON.parse(xhr.responseText));
				}
			};

			xhr.send();
		});
	}

	// формат даты
	var formatter = new Intl.DateTimeFormat("ru", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	// функция переключения слайдов
	function Switch(links) {

		var elem = document.querySelector('.slider__content');

		var menu = document.querySelector('.navbar__menu');
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
		links[activeLink].classList.add('item-links_active');

		function setClickedItem(e) {
			removeActiveLinks();

			var clickedLink = e.target;
			activeLink = clickedLink.itemID;

			changePosition(clickedLink);
		}

		// удаление активной ячейки
		function removeActiveLinks() {
			if (links[activeLink].className = "item-links item-links_active") {
				for (var i = 0; i < links.length; i++) {
					links[i].classList.remove('item-links_active');
				}
			}
		}
		// Обработчик изменяет позицию слайдера, после того, как мы убедились,
		// что в качестве активной обозначена нужная нам ссылка.
		function changePosition(link) {
			if (links[activeLink].contains = "item-links") {
				link.classList.add('item-links_active');

				var position = link.getAttribute('data-pos');
				slider.style.left = position;
			}

		}

		// перелистывание слайдов по клику на стрелку "вправо"
		var navRight = document.querySelector('.articles__next');
		navRight.addEventListener('click', Right, false);

		//console.log("links.length = ", links.length);
		function Right() {
			for (var i = 0; i < links.length; i++) {
				if (links[i].classList.contains('item-links_active')) {

					// проверяем является ли слайд последним, если да, то присваиваем переменной item ноль,
					// чтобы перейти к самому первому слайду
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
		navLeft.addEventListener('click', Left, false);

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

	function Slides (obj) {
		//console.log(guidMap);
		var elem = document.querySelector('.slider__content');

		var pos = 22;
		var item = document.querySelector('.slider-nav__content');

		for (var i = 0; i < 7; i++) {

			var li = document.createElement('li');
			li.className = 'articles__block';
			// строчка кода ниже для перехода по клину на слайдер к приложению в каталоге,
			// но поскольку я вспомнил об этом в самый последний момент,
			// то не успел реализовать
			li.setAttribute('data-app', obj[i].id);

			var image = document.createElement('img');
			image.className = 'articles__block-img';
			image.src = guidMap[obj[i].guid];

			var title = document.createElement('div');
			title.className = 'articles__block-title';
			title.innerHTML = obj[i].title;

			var date = document.createElement('div');
			date.className = 'articles__block-data';

			var Data = new Date (obj[i].lastUpdate * 1000);

			date.innerHTML = formatter.format(Data);

			elem.appendChild(li);
			li.appendChild(image);
			li.appendChild(title);
			li.appendChild(date);

			// добавление элементов для того чтобы слайдер прокручивался при нажатии на точку,
			// я решил что стоит их тоже сделать динамическими, а то вдруг слайдов будет 5,
			// а точек так и останется 7, что неправильно
			var items = document.createElement('li');
			items.className = "item-links";
			items.setAttribute("data-pos", pos + 'rem');
			item.appendChild(items);

			pos -= 22;
		}

		var links = document.querySelectorAll('.item-links');

		// вызываем функцию переключения
		Switch(links);
	}

	// вывод каталога приложений

	function Apps (appsObj) {
		var elemApps = document.querySelector('.aside-catalog__list');

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

	// огромная куча копипасты для динамической замены контента при клике на ссылку каталога приложений слева
	// сделал аналогично переключению слайдов в слайдере, но наверное лучше было бы смотреть по айди и потом грузить
	var content = document.querySelector('.content');

	function appInfoFunc(appInfoObj) {

		var appsList = document.querySelectorAll('.aside-catalog__list_link');

		var title = document.querySelector('.content__title');
		var date = document.querySelector('.app__date');
		var desc = document.querySelector('.app__desc');
		var require = document.querySelector('.app__require-desc');
		var image = document.querySelector('.app__image');
		var func = document.querySelector('.func__body');
		var price = document.querySelector('.app__price-caption');

		var activeApp = 0;

		appsList[activeApp].classList.add('aside-catalog__list_link-active');

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

			for (var i = 0; i < appInfoObj.length; i++) {
				if (id == appInfoObj[i].id) {

					title.innerHTML = appInfoObj[i].title;

					// функция отдельная нужна
					var Data = new Date (appInfoObj[i].lastUpdate * 1000);
					date.innerHTML = formatter.format(Data);
					var strDesc = appInfoObj[i].description.replace(/\n/g, '<br>');
					desc.innerHTML = strDesc;
					require.innerHTML = appInfoObj[i].requirements;
					price.innerHTML = appInfoObj[i].price;

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

		var Cart = function() {
			// решил выводить счетчик количества приложений через длинну local storage
			// теперь даже не знаю как реорганизовать свой код чтобы сюда что-то вставить
			// пустота не нравится
			//this.number = number;
			//this.idS = [];
		};

		Cart.prototype.increase = function() {
			var cartNumber = document.querySelector('.content__cart-number');
			cartNumber.innerHTML = localStorage.length;
		};

		Cart.prototype.add = function(appId){
			//console.log(this.idS);
			localStorage.setItem(appId, '1');
			this.increase();
			//localStorage.clear();
		};

		Cart.prototype.del = function(ex) {

			var row = document.querySelectorAll('.table-basket__row');
			var tableBody = document.querySelector('tbody');
			var sum = 0;
			//console.log(row);
			for (var r = 0; r < row.length; r++) {
				var tableRow = row[r].getAttribute('data-num');
				//console.log(tableRow);
				// сравниваем полученный дата атрибут у кнопки удаления с дата атрибутом строки в таблице,
				// если они равны, то пытаемся удаляем строку
				if (ex == tableRow) {
					// удаляем сначала элемент в local storage
					localStorage.removeItem(ex);
					var kol = localStorage.length;
					if (kol >= 0) {

						tableBody.removeChild(row[r]);

						// смотрим оставишеся строки таблицы после удаления для пересчета суммы
						var tr = document.querySelectorAll('.table-basket__row');
						for (var i = 0; i < tr.length; i++) {
							var tableR = tr[i].getAttribute('data-num');
							for (var jsFile = 0; jsFile < appInfoObj.length; jsFile++) {
								if (tableR == appInfoObj[jsFile].id) {
									var s = appInfoObj[jsFile].price;
									sum += s;
									//console.log(sum);
								}
							}
						}
					}
				}
			}
			// пересчитываем сумму
			this.summa(sum);
			// обновляем счетчик
			this.increase();
			// отслеживаем нажатие кнопок в корзине
			this.ListenerButton();
		};

		Cart.prototype.summa = function(sum) {
			// отделяем целую часть
			var intNumber = parseInt(sum, 10);
			var fract = sum - intNumber;
			// на всякий случай отсекаем ненужные значения, чтобы было только два знака после запятой
			fract = fract.toFixed(2);
			var srtFract = String(fract);
			// отсекаме 0. чтобы получить строку, нужно в том случае если дробная часть будет 0.01
			// чтобы копейки правильно вывелись - 01, а не 1
			var strTotal = srtFract.substr(2, 2);
			var cashInt = document.querySelector('.total__cash-sum');
			cashInt.innerHTML = intNumber;
			var cashFract = document.querySelector('.total__cash-cent');
			cashFract.innerHTML = strTotal;
		};

		Cart.prototype.show = function() {
			// если товар не добавлен в корзину, то не показываем ее
			if (localStorage.length == 0) {
				this.turn(0);
			}
			// выводим наши товары в корзине
			var table = document.querySelector('tbody');
			var tr = document.createElement('tr');
			tr.className = "table-basket__row";
			var trInner = document.querySelector('.table-template').content;

			// вывод количества строк в таблице в зависимости от добавленных товаров
			for (var key in localStorage) {
				for (var j = 0; j < appInfoObj.length; j++) {
					if (key == appInfoObj[j].id) {
						tr.setAttribute('data-num', appInfoObj[j].id);
						table.appendChild(tr.cloneNode(true));
						//console.log(appInfoObj[j].id);
					}
				}
			}
			var trFill = document.querySelectorAll('.table-basket__row');
			var sum = 0;
			// а теперь само заполнение таблицы
			// на мой взгляд ужасно, но лучше придумать не смог
			for (var k = 0; k < trFill.length; k++) {
				trFill[k].appendChild(trInner.cloneNode(true));
				//console.log(trFill[k].childNodes[3]);
				var tdPriceFill = trFill[k].childNodes[3];
				var tdTotalFill = trFill[k].childNodes[5];
				//console.log(trFill[k].childNodes[7]);
				var tdDel = trFill[k].childNodes[7];
				//console.log(tdDelBtn.childNodes[1]);
				var tdDelBtn = tdDel.childNodes[1];
				//console.log(tdDelBtn);

				var dataNumber = trFill[k].getAttribute('data-num');
				// сверяем наши дата атрибуты с нужным идентификатором и прописываем в кнопку удаления
				for (var jsFile = 0; jsFile < appInfoObj.length; jsFile++) {
					if (dataNumber == appInfoObj[jsFile].id) {
						trFill[k].childNodes[1].innerHTML = appInfoObj[jsFile].title;
						tdPriceFill.childNodes[3].innerHTML = appInfoObj[jsFile].price;
						tdTotalFill.childNodes[3].innerHTML = appInfoObj[jsFile].price;
						tdDelBtn.setAttribute('data-num', appInfoObj[jsFile].id);
						var s = appInfoObj[jsFile].price;

						sum += s;
					}
				}
			}
			// сумма
			this.summa(sum);
			// отслеживание кнопочек
			this.ListenerButton();
		};

		Cart.prototype.turn = function(page) {
			// наш переключатель между страничками корзины
			var cartWindow = document.querySelector('.cart');
			if (page == 0) {
				cartWindow.innerHTML = "";
				cartWindow.style.display = 'none';
			} else if (page == 1) {
				cartWindow.innerHTML = "";
				var firstPage = document.querySelector('.cart-page-first').content;
				cartWindow.appendChild(firstPage.cloneNode(true));
				this.show();
				delAppListener();
			} else if (page == 2) {
				cartWindow.innerHTML = "";
				var secondPage = document.querySelector('.cart-page-second').content;
				cartWindow.appendChild(secondPage.cloneNode(true));
				this.ListenerButton();
			} else if (page == 3) {
				var load = document.querySelector('.loading');
				load.style.display = 'block';
				setTimeout(function(){
					cartWindow.innerHTML = "";
					var thirdPage = document.querySelector('.cart-page-third').content;
					load.style.display = 'none';
					cartWindow.appendChild(thirdPage.cloneNode(true));

					var listen = new Cart();
					listen.ListenerButton();
				}, 2000);
			}	else if (page == 4) {
				var load = document.querySelector('.loading');
				load.style.display = 'block';
				setTimeout(function(){
					cartWindow.innerHTML = "";
					var fourthPage = document.querySelector('.cart-page-fourth').content;
					load.style.display = 'none';
					cartWindow.appendChild(fourthPage.cloneNode(true));

					var listen = new Cart();
					listen.ListenerButton();
				}, 2000);
			} else if (page == 5) {
				cartWindow.innerHTML = "";
				cartWindow.style.display = 'none';
				// на последнем этапе очищаем наш local storage
				localStorage.clear();
				this.increase();
			// костыль для переключения с последней страницы корзины на третью,
			// чтобы не появлялся блок с анимацией загрузки
			} else if (page == 6) {
				var load = document.querySelector('.loading');
				load.style.display = 'block';
				cartWindow.innerHTML = "";
				var thirdPage = document.querySelector('.cart-page-third').content;
				load.style.display = 'none';
				cartWindow.appendChild(thirdPage.cloneNode(true));
				this.ListenerButton();
			}
		};

		Cart.prototype.ListenerButton = function() {
			// метод отслеживания кнопочек
			// ищем наши кнопки с навигацией внизу корзины и начинаем следить за ними
			var backCatalog = document.querySelectorAll('.button');
			//console.log(backCatalog);
			var button;
			for (var b = 0; b < backCatalog.length; b++) {
				button = backCatalog[b];
				button.addEventListener('click', turnPage, false)
			}

			// аналогично, только для панели навигации вверху корзины
			var navbar = document.querySelectorAll('.navbar-basket-switch__item-back');
			var navigation;
			for (var n = 0; n < navbar.length; n++) {
				navigation = navbar[n];
				navigation.addEventListener('click', turnNav, false);
			}

			function turnPage(e) {
				var btn = e.target;
				var numberPage = btn.getAttribute('data-page');
				var turnspages = new Cart();
				turnspages.turn(numberPage);
			}

			function turnNav(e) {
				var nav = e.target;
				var navPage = nav.getAttribute('data-page');
				var navpages = new Cart();
				navpages.turn(navPage);
			}
		};

		var num = new Cart();
		// сразу вызываем наш счетчик
		num.increase();

		// отслеживаем кнопку нажатия при добавлении в корзину
		// по идее раз я сделал ограничение приложений, чтобы конкретного приложения было не больше 1 штуки,
		// то надо было сделать ее неактивной у того приложения, которое мы уже добавили в корзину
		var appButon = document.querySelector('.app-button');
		appButon.addEventListener('click', AppClickCart, false);

		function AppClickCart (e) {

			var sel = document.querySelector('.aside-catalog__list_link-active');
			var dataId = sel.getAttribute('data-id');

			num.add(dataId);
			//console.log(this.idS);
		}

		// сразу грузим блок с незаполненной корзиной и делаем его скрытым
		var cartPages = document.querySelector('.content__cart');
		var catalog = document.querySelector('.cart-page-first').content;

		cartPages.addEventListener('click', CartShow, false);

		function CartShow (e) {

			var cartWindow = document.querySelector('.cart');
			cartWindow.appendChild(catalog.cloneNode(true));
			cartWindow.style.display = 'block';
			// обращаемся к методу класса show при нажатии на значок корзины в каталоге
			num.show();
			delAppListener();
		}

		function delAppListener() {
			var delApp = document.querySelectorAll('.table-basket__row_del');
			//console.log(delApp);
			for (var d = 0; d < delApp.length; d++) {

				var app = delApp[d];
				app.addEventListener('click', deleteApp, false);
			}
		}

		var appID = 0;
		// ну тут удаление
		function deleteApp (e) {
			var clickedDelApp = e.target;
			var ex = clickedDelApp.getAttribute('data-num');
			//console.log(ex);
			num.del(ex);
		}
	}
}());