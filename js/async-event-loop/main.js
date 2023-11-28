const cssPromises = {};

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then((res) => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const episodeId = searchParams.get('episodeId');

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map((src) => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    });
}

if (episodeId) {
  renderPage(
    './film-details.js',
    `https://swapi.dev/api/films/${episodeId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
  );
} else {
  renderPage(
    './film-list.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css',
  );
}
