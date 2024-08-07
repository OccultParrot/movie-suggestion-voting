const movieListEl = document.querySelector(".movie-list");
const movieSuggestionForm = document.querySelector(".suggest-movie");

function movieListRefresh() {
    const movieArray = JSON.parse(localStorage.getItem("MovieArray")) || [];
    movieListEl.innerHTML = "";
    movieArray.forEach(movie => {
        const movieEl = document.createElement("section");
        movieEl.dataset.id = movie.id;
        movieEl.classList.add("movie");

        const titleEl = document.createElement("h2");
        const descriptionEl = document.createElement("p");

        const voteButtonsEl = document.createElement("form");
        voteButtonsEl.classList.add("vote-buttons");

        const upVoteEl = document.createElement("button");
        upVoteEl.classList.add("upvote");
        upVoteEl.addEventListener("click", upVote)

        const downVoteEl = document.createElement("button");
        downVoteEl.classList.add("downvote");
        downVoteEl.addEventListener("click", downVote);

        titleEl.textContent = movie.title;
        descriptionEl.textContent = movie.description;
        // TODO: Find better icons for upvote and downvote
        upVoteEl.innerHTML = "&#128077";
        downVoteEl.innerHTML = "&#128078";

        voteButtonsEl.appendChild(upVoteEl);
        voteButtonsEl.appendChild(downVoteEl);

        movieEl.appendChild(titleEl);
        movieEl.appendChild(descriptionEl);
        movieEl.appendChild(voteButtonsEl);
        movieListEl.appendChild(movieEl);
    });
}

// TODO: Finish the voting system
const upVote = function (event) {
    event.preventDefault();
    const movieEl = event.currentTarget.parentElement.parentElement;
    console.log("Upvoted movies ID is: " + movieEl.dataset.id);
}

const downVote = function (event) {
    event.preventDefault();
    const movieEl = event.currentTarget.parentElement.parentElement;
    console.log("Downvoted movies ID is: " + movieEl.dataset.id);
}

const suggestMovie = function (event) {
    event.preventDefault();
    if (movieSuggestionForm.querySelector("#movieName").value == "") 
        return;

    const movieArry = JSON.parse(localStorage.getItem("MovieArray")) || [];
    const movieTitle = movieSuggestionForm.querySelector("#movieName").value;
    const movieDescription = movieSuggestionForm.querySelector("#movieDescription").value;


    let nextID = Number.parseInt(localStorage.getItem("nextID")) || 0;
    const ID = nextID++;
    localStorage.setItem("nextID", nextID);
    console.log(nextID);
    const movie = {
        id: ID,
        title: movieTitle,
        description: movieDescription,
        points: 0,
        votes: 0
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
    localStorage.setItem("nextID", "0");
    localStorage.removeItem("MovieArray");
    movieListRefresh();
}

function init() {
    movieListRefresh();
    movieSuggestionForm.querySelector("#suggest").addEventListener("click", suggestMovie);
    movieSuggestionForm.querySelector("#clear").addEventListener("click", clearMovies);
}

init();