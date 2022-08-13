let movieList = [];
let lSitems = JSON.parse(localStorage.getItem('watchlist'));
const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=e177e417';

function renderCard(titleArr, element, icon) {
  titleArr.forEach(async (title) => {
    const res = await fetch(`${url}&t=${title}`);
    const data = await res.json();
    element.innerHTML += `
            <div class="card">
              <div class="movie-poster">
                  <img src="${data.Poster}" alt="" />
              </div>
              <div class="movie-info">
                  <div class="info">
                      <h2 class="title">${data.Title}</h2>
                      <img src="./img/starIcon.png" alt="">
                      <p>${data.imdbRating}</p>
                  </div>
                  <div class="additional-info">
                      <p>${data.Runtime}</p>
                      <p>${data.Genre}</p>
                      <button class="ls-btn"><img src="./img/${icon}.png" alt=""> 
                      ${icon === 'addIcon' ? 'Watchlist' : 'Remove'} </button>
                      <h2 class="hide">${data.Title}</h2>
                  </div>
                  <div class="description">
                      <p>${data.Plot}  </p>
                  </div>
              </div> 
            </div> `;
    if (icon === 'addIcon') {
      document.querySelectorAll('.ls-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const movieName = e.target.nextElementSibling.textContent;
          movieList.push(movieName);
          localStorage.setItem('watchlist', JSON.stringify(movieList));
        });
      });
    } else {
      document.querySelectorAll('.ls-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const eTarget =
            e.target.parentElement.parentElement.childNodes[1].childNodes[1]
              .textContent;
          lSitems.forEach((movie, index) => {
            if (movie === eTarget) {
              lSitems.splice(index, 1);
              localStorage.setItem('watchlist', JSON.stringify(lSitems));
            }
          });
          e.target.parentElement.parentElement.parentElement.remove();
        });
      });
    }
  });
}

export { renderCard, movieList };
