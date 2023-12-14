import { el, setChildren } from 'redom';
import Navigo from 'navigo';

const router = new Navigo('/');

const h1 = el('h1', 'Каталог товаров');

setChildren(window.document.body, h1);

function getProductList() {
  const body = el('div', 'loading');

  fetch('https://fakestoreapi.com/products')
    .then(async (res) => {
      const data = await res.json();

      const ul = el('ul');

      setChildren(ul, data.map((product) => el(
        'li',
        el('a', {
          href: `/products/${product.id}`,
          onClick(event) {
            event.preventDefault();
            router.navigate(event.target.getAtribute('href'));
          }
        },
        product.title),
      )));
      body.innerHTML = '';
      setChildren(body, ul);
    });

  return el('div', [
    el('h1', 'Product list'),
    body,
  ]);
}

function catalogDetails(id) {
  const body = el('div', 'loading');

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(async (res) => {
      const data = await res.json();

      body.innerHTML = '';

      setChildren(body, [
        el('a', {
          href: `/`,
          onClick(event) {
            event.preventDefault();
            router.navigate(event.target.getAtribute('href'));
          },
        }, 'Back to list'),
        el('h2', data.title),
        el('p', data.description),
        el('img', {
          src: data.image,
          alt: data.title,
        }),
      ]);
    });

  return el('div', [
    el('h1', `Product details ${id}`),
    body,
  ]);
}

router.on('/', () => {
  setChildren(window.document.body, getProductList());
});

router.on('/products/:id', ({ data: { id } }) => {
  setChildren(window.document.body, catalogDetails(id));
});

router.resolve();