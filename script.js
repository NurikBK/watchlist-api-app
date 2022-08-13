import { renderCard } from '/app.js';
const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=e177e417';

const searchEl = document.getElementById('search'),
  searchBtn = document.getElementById('search-btn'),
  cardsEl = document.getElementById('cards');

const addIcon = 'addIcon';

searchBtn.addEventListener('click', function () {
  cardsEl.innerHTML = '';
  const title = searchEl.value;
  getTitles(title);
  searchEl.value = '';
});

async function getTitles(value) {
  const res = await fetch(`${url}&s=${value}`);
  const data = await res.json();
  const titleArr = data.Search.map((search) => search.Title);
  if (titleArr === undefined) {
    cardsEl.innerHTML = `<h2 class="msg">Unable to find what you're looking for. Please try another search.</h2>`;
  } else {
    renderCard(titleArr, cardsEl, addIcon);
  }
}
