const movieListEl = document.querySelector(".movie-list");
const movieSuggestionForm = document.querySelector(".suggest-movie");

function movieListRefresh() {
    
}

function init() {

}
const suggestMovie = function (event) {
    event.preventDefault();
    const movieArry = JSON.parse(localStorage.getItem("MovieArray")) || [];

    const movieTitle = movieSuggestionForm.querySelector("#movieName").value;
    if (movieTitle == "") 
        return;
    const movie = {
        points: 0,
        votes: 0,
        title: movieTitle
    };
    movieArry.push(movie);
    localStorage.setItem("MovieArray", JSON.stringify(movieArry));
    console.log(movieArry);
}

movieSuggestionForm.querySelector("#suggest").addEventListener("click", suggestMovie);