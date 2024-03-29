/*=======================================================*/
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/nwezeolisa                                */
/*                                                       */
/*=======================================================*/

'use strict';

import { select, selectAll, create, listen } from './utils.js';
import movies from './movies.js';

/*=======================================================*/
/*  Global Variables                                     */
/*=======================================================*/

const search = select('.search-box');
const findButton = select('.button');
const dropdown = select('.dropdown-content');
const suggestionsList = select('.dropdown-content ul');
const moviePoster = select('.movie-poster');
const movieTitle = select('.movie-title');
const movieReleaseDate = select('.movie-release-date');
const movieRuntime = select('.movie-runtime');
const movieWriteup = select('.movie-writeup');
const genreSection = select('.movie-genre-section');
const seperator = select('.green');
const MAX = 5;

/*=======================================================*/
/*  Functions                                            */
/*=======================================================*/

function filterMovieTitles(input) {
  const capsCheck = movie => 
  movie.title.toLowerCase().includes(input.toLowerCase());
  let filteredMovies = movies.filter(capsCheck);
  return filteredMovies.slice(0, MAX);
}

function getMovieSuggestions(suggestions) {
  suggestionsList.innerHTML = '';

  if (suggestions.length === 0) {
    let notFoundItem = create('li');
    notFoundItem.textContent = 'Movie not found';
    suggestionsList.appendChild(notFoundItem);
    dropdown.classList.add('show');
  } else {
    suggestions.forEach(movie => {
      let listItem = create('li');
      listItem.textContent = movie.title;
      suggestionsList.appendChild(listItem);
      dropdown.classList.add('show', 'pointer');
    });
  }
}

function readInput() {
  const input = this.value.trim();
  if (input.length >= 3) {
    let filteredMovies = filterMovieTitles(input);
    getMovieSuggestions(filteredMovies);
  } else {
    suggestionsList.innerHTML = '';
    dropdown.classList.remove('show', 'pointer');
  } 
}

function selectSuggestion(e) {
  if (e.target.tagName === 'LI' && e.target.textContent !== 'Movie not found') {
    search.value = e.target.textContent;
    dropdown.classList.remove('show'); 
  }
}

function getMovieGenre(selectedMovie) {
  selectAll('.movie-genre').forEach(genre => genre.remove());

  if (selectedMovie) {
    selectedMovie.genre.forEach(genre => {
      let genreDiv = create('p');
      genreDiv.classList.add('movie-genre');
      genreDiv.textContent = genre;
      genreSection.appendChild(genreDiv);
    });
  }
}

function getMovieDescription() {
  let searchInput = search.value.trim();
  let selectedMovie = movies.find(movie => movie.title === searchInput);
  if (selectedMovie) {
    moviePoster.style.backgroundImage = `url(${selectedMovie.poster})`;
    movieTitle.innerText = selectedMovie.title;
    movieReleaseDate.innerText = selectedMovie.year;
    movieRuntime.innerText = selectedMovie.runningTime;
    movieWriteup.innerText = selectedMovie.description;
    getMovieGenre(selectedMovie);
    seperator.classList.add('show-seperate'); 
  }
}

/*=======================================================*/
/*  Event Listeners                                     */
/*=======================================================*/

listen('click', suggestionsList, selectSuggestion);
listen('input', search, readInput);
listen('click', findButton, getMovieDescription);