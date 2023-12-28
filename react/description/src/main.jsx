import './index.css'
import { TermList } from './TermList';
import { createRoot } from 'react-dom/client'

function saveTermList(terms) {
  localStorage.setItem('termList', JSON.stringify(terms));
}

function restoreTermList() {
  const rawTermList = localStorage.getItem('termList');

  if(!rawTermList) {
    return []
  }

  return JSON.parse(rawTermList);
}

let terms = restoreTermList();
const descriptionList = document.getElementById('description-list');

const reactRoot = createRoot(descriptionList)

function syncTermList() {
  saveTermList(terms)
  reactRoot.render(<TermList terms={terms} onDelete={deleteTerm} />)
}

function addTerm(title, description) {
  terms.push({
    id: crypto.randomUUID(),
    title,
    description
  });

  terms.sort((term1, term2) => (term1.title < term2.title ? -1 : 1));
  syncTermList()
}

function deleteTerm(id) {
  terms = terms.filter((term) => term.id !== id);
  syncTermList()
}



syncTermList()

const form = document.getElementById('add-description');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = form.elements['title'].value;
  const description = form.elements['description'].value;

  form.reset();

  addTerm(title, description);
})
