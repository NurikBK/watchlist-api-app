import {renderCard} from '/app.js'

const movieEl = document.getElementById('movie-list');

const deleteIcon = 'deleteIcon';

let lSitems = JSON.parse(localStorage.getItem('watchlist'));

renderCard(lSitems, movieEl, deleteIcon);
