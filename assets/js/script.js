const movieListEl = document.querySelector(".movie-list");
const movieSuggestionForm = document.querySelector(".suggest-movie");

function movieListRefresh() {
    const movieArray = JSON.parse(localStorage.getItem("MovieArray")) || [];
    movieListEl.innerHTML = "";
    movieArray.forEach(movie => {
        const movieEl = document.createElement("section");
        movieEl.classList.add("movie");

        const titleEl = document.createElement("h2");
        const descriptionEl = document.createElement("p");

        const voteButtonsEl = document.createElement("form");
        voteButtonsEl.classList.add("vote-buttons");

        const upVoteEl = document.createElement("button");
        upVoteEl.classList.add("upvote");
        const downVoteEl = document.createElement("button");
        downVoteEl.classList.add("downvote");

        titleEl.textContent = movie.title;
        descriptionEl.textContent = movie.description;
        // TODO: Find better icons for upvote and downvote
        upVoteEl.textContent = "⬆";
        downVoteEl.textContent = "⬇";

        voteButtonsEl.appendChild(upVoteEl);
        voteButtonsEl.appendChild(downVoteEl);

        movieEl.appendChild(titleEl);
        movieEl.appendChild(descriptionEl);
        movieEl.appendChild(voteButtonsEl);
        movieListEl.appendChild(movieEl);

    });
}

// TODO: Make the voting system

const suggestMovie = function (event) {
    event.preventDefault();
    const movieArry = JSON.parse(localStorage.getItem("MovieArray")) || [];

    const movieTitle = movieSuggestionForm.querySelector("#movieName").value;
    const movieDescription = movieSuggestionForm.querySelector("#movieDescription").value;
    if (movieTitle == "") 
        return;
    const movie = {
        points: 0,
        votes: 0,
        title: movieTitle,
        description: movieDescription
    };
    movieArry.push(movie);
    localStorage.setItem("MovieArray", JSON.stringify(movieArry));
    console.log(movieArry);
    movieSuggestionForm.querySelector("#movieName").value = "";
    movieSuggestionForm.querySelector("#movieDescription").value = "";
    movieListRefresh();
}

const clearMovies = function (event) {
    event.preventDefault();
    localStorage.removeItem("MovieArray");
    movieListRefresh();
}

function init() {
    movieListRefresh();
    movieSuggestionForm.querySelector("#suggest").addEventListener("click", suggestMovie);
    movieSuggestionForm.querySelector("#clear").addEventListener("click", clearMovies);
}

init();