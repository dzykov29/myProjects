// Функция для обработки данных и добавления элементов в список
function fetchDataAndAppendToDOM(urls, listElement, itemName, nameProperty) {
  const fetchPromises = urls.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .then((item) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = item[nameProperty];
        return itemElement;
      })
  );
  return Promise.all(fetchPromises)
    .then((items) => {
      items.forEach((item) => {
        listElement.append(item);
      });
    });
}

export function render(data) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const backToMain = document.createElement('a');
  const descr = document.createElement('p');
  const planetsList = document.createElement('ul');
  const speciesList = document.createElement('ul');
  const subtitlePlanet = document.createElement('h2');
  const subtitleSpecies = document.createElement('h2');
  const spinner = document.getElementById('spinner');

  container.classList.add('container', 'py-4');
  backToMain.classList.add('btn', 'btn-primary');

  title.textContent = data.title + ' ' + 'Episode:' + ' ' + data.episode_id;
  backToMain.textContent = 'Back to episodes';

  descr.textContent = data.opening_crawl;

  subtitlePlanet.textContent = 'Planets';
  subtitleSpecies.textContent = 'Species';


  // Создаем массив промисов для планет
  const planetsPromise = fetchDataAndAppendToDOM(data.planets, planetsList, 'planet', 'name');

  // Создаем массив промисов для видов
  const speciesPromise = fetchDataAndAppendToDOM(data.species, speciesList, 'specie', 'name');

  // Дожидаемся выполнения всех промисов
  Promise.all([planetsPromise, speciesPromise])
    .then(() => {
      container.append(title);
      container.append(backToMain);
      container.append(descr);
      container.append(subtitlePlanet);
      container.append(planetsList);
      container.append(subtitleSpecies);
      container.append(speciesList);
      spinner.style.display = 'none';
    });

  // Обработчик события клика
  backToMain.addEventListener('click', () => {
    // Получаем текущий URL
    const currentUrl = new URL(window.location.href);
    // Удаляем параметр episodeId
    currentUrl.searchParams.delete('episodeId');
    // Обновляем URL без перезагрузки страницы
    window.history.pushState({}, '', currentUrl.href);
    location.reload();
  });

  return container;
}
