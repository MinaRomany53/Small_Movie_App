"use strict";
// Using "https://www.themoviedb.org/settings/api" to get Data for Movies.
// "https://www.themoviedb.org/documentation/api/discover"

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=acf972594b1f5f9519aa0cee9b393656&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=acf972594b1f5f9519aa0cee9b393656&query='";
// because we didn't have full path when we call IMG attr from obj within API.
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
//
const form = document.getElementById("search-form");
const searchBox = document.getElementById("search");
const main = document.getElementById("main");

//Get Intial Movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showingMovies(data.results);
}

// Search EventHandler
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = searchBox.value;
  if (searchTerm && searchTerm !== " ") {
    getMovies(SEARCH_API + searchTerm + "'");
    searchBox.value = " ";
  } else {
    window.location.reload();
  }
});

// Adding Movies to the Dom
function showingMovies(results) {
  main.innerHTML = " ";
  results.forEach(function (movie, i) {
    let rateColor = "";
    if (movie.vote_average >= 8) {
      rateColor = "green";
    } else if (movie.vote_average < 8 && movie.vote_average >= 5) {
      rateColor = "orange";
    } else {
      rateColor = "red";
    }
    const cardHtml = `<div class="card">
    <img
      src="${IMAGE_PATH + movie.poster_path}"
      alt="${movie.title}"
      class="movie-image"
    />
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <span class="${rateColor}">${movie.vote_average}</span>
    </div>
    <div class="overview-container">
      <h3>Overview</h3>
      <p id="overview">${movie.overview}</p>
    </div>
  </div>`;
    main.insertAdjacentHTML("beforeend", cardHtml);
  });
}
//
//
//

//
//
//
//
//
//
//
//

// object example
//   [{"adult":false,"backdrop_path":"/efuPybo8V8KTYGslQphO74LRvm0.jpg","genre_ids":[878,28,12],"id":580489,"original_language":"en","original_title":"Venom: Let There Be Carnage","overview":"After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.","popularity":4497.836,"poster_path":"/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg","release_date":"2021-09-30","title":"Venom: Let There Be Carnage","video":false,"vote_average":6.8,"vote_count":1823}

// const jokeEl = document.getElementById("joke");
// const jokeBtn = document.getElementById("jokeBtn");

// generateJoke();
// jokeBtn.addEventListener("click", generateJoke);

// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: "application/json",
//     },
//   };

//   fetch("https://icanhazdadjoke.com", config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke;
//     });
// }
