const movieListEl = document.querySelector(".movie-list");
const movieSuggestionForm = document.querySelector(".suggest-movie");

function movieListRefresh() {
    const movieArray = JSON.parse(localStorage.getItem("MovieArray")) || [];
    movieListEl.innerHTML = "";
    movieArray.forEach(movie => {
        const movieEl = document.createElement("section");
        movieEl.dataset.id = movie.id;
        movieEl.classList.add("movie");
        movieEl.classList.add("section");
        movieEl.classList.add("cell");
        movieEl.classList.add("box");
        

        const titleEl = document.createElement("h2");
        titleEl.classList.add("title");
        const descriptionEl = document.createElement("p");
        descriptionEl.classList.add("subtitle");

        const voteButtonsEl = document.createElement("form");
        voteButtonsEl.classList.add("form");
        voteButtonsEl.classList.add("vote-buttons");
        voteButtonsEl.classList.add("box");

        const upVoteEl = document.createElement("button");
        upVoteEl.classList.add("button");
        upVoteEl.classList.add("is-soft");
        upVoteEl.classList.add("is-success");
        upVoteEl.classList.add("upvote");
        upVoteEl.classList.add("voting-button");
        upVoteEl.addEventListener("click", upVote);

        const downVoteEl = document.createElement("button");
        downVoteEl.classList.add("is-soft");
        downVoteEl.classList.add("button");
        downVoteEl.classList.add("is-danger");
        downVoteEl.classList.add("downvote");
        downVoteEl.classList.add("voting-button");
        downVoteEl.addEventListener("click", downVote);

        const finalScoreEl = document.createElement("p");
        finalScoreEl.textContent = `Final Score: ${movie.points}`;
        finalScoreEl.classList.add("final-score");
        finalScoreEl.classList.add("subtitle");
        
        const totalVotes = document.createElement("p");
        totalVotes.textContent = `Total Votes: ${movie.votes}`;
        totalVotes.classList.add("total-votes");
        totalVotes.classList.add("subtitle");

        titleEl.textContent = movie.title;
        descriptionEl.textContent = movie.description;
        upVoteEl.innerHTML = "<i class=\"fa-solid fa-thumbs-up\"></i>";
        downVoteEl.innerHTML = "<i class=\"fa-solid fa-thumbs-down\"></i>";

        voteButtonsEl.appendChild(upVoteEl);
        voteButtonsEl.appendChild(downVoteEl);
        voteButtonsEl.appendChild(finalScoreEl);
        voteButtonsEl.appendChild(totalVotes);

        movieEl.appendChild(titleEl);
        movieEl.appendChild(descriptionEl);
        movieEl.appendChild(voteButtonsEl);
        movieListEl.appendChild(movieEl);
        
        resetVoting();
    });
}

const upVote = function (event) {
    event.preventDefault();
    
    const movieEl = event.currentTarget.parentElement.parentElement;
    const movieArray = JSON.parse(localStorage.getItem("MovieArray"));

    for (const movie of movieArray) {
        if (movie.id == movieEl.dataset.id) {
            movie.points++;
            movie.votes++;

            // We break so that if they have a LOT of movies it doesn't have to go through them ALL unless its the last one lol
            break;
        }
    }
    movieListRefresh();
    localStorage.setItem("MovieArray", JSON.stringify(movieArray));
}

const downVote = function (event) {
    event.preventDefault();

    const movieEl = event.currentTarget.parentElement.parentElement;
    const movieArray = JSON.parse(localStorage.getItem("MovieArray"));

    for (const movie of movieArray) {
        if (movie.id == movieEl.dataset.id) {
            movie.points--;
            movie.votes++;

            // We break so that if they have a LOT of movies it doesn't have to go through them ALL unless its the last one lol
            break;
        }
    }
    movieListRefresh();
    localStorage.setItem("MovieArray", JSON.stringify(movieArray));
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
    const movie = {
        id: ID,
        title: movieTitle,
        description: movieDescription,
        points: 0,
        votes: 0
    };

    movieArry.push(movie);
    localStorage.setItem("MovieArray", JSON.stringify(movieArry));
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

const finishVotingModal = function (event) {
    document.querySelector("#finish-voting-modal").classList.add("is-active");
}

const finishVotingAccept = function (event) {
    document.querySelector("#finish-voting-modal").classList.remove("is-active");
    finishVoting();
}

const finishVoting = function (event) {
    document.querySelectorAll(".voting-button").forEach((button) => {button.setAttribute("style", "display: none;")})
    document.querySelectorAll(".final-score").forEach((button) => {button.setAttribute("style", "display: block;")})
    document.querySelectorAll(".total-votes").forEach((button) => {button.setAttribute("style", "display: block;")})

    const highestScoreEl = document.querySelector("#winning");
    const lowestScoreEl = document.querySelector("#least-voted");

    document.querySelector("#finished-voting").setAttribute("style", "display: block");
    document.querySelector("#voting").setAttribute("style", "display: none");

    const movieList = JSON.parse(localStorage.getItem("MovieArray"));
    let highestMovie = {
        points: 0
    };
    
    for (const movie of movieList) {
        if (movie.points > highestMovie.points)
            highestMovie = movie;
    }

    let lowestMovie = {
        points: 9999
    }

    for (const movie of movieList) {
        if (movie.points < lowestMovie.points)
            lowestMovie = movie;
    }

    highestScoreEl.innerHTML = `The highest voted movie was <strong>${highestMovie.title}</strong>`;
    lowestScoreEl.innerHTML = `The lowest voted movie was <strong>${lowestMovie.title}</strong>`;
}

const resetVoting = function (event) {
    document.querySelectorAll(".voting-button").forEach((button) => {button.setAttribute("style", "display: inline;")})
    document.querySelectorAll(".final-score").forEach((button) => {button.setAttribute("style", "display: none;")})
    document.querySelectorAll(".total-votes").forEach((button) => {button.setAttribute("style", "display: none;")})

    document.querySelector("#finished-voting").setAttribute("style", "display: none;");
    document.querySelector("#voting").setAttribute("style", "display: block;");
}

function themeCheck() {
    if (localStorage.getItem("isLightMode") === "true")
        localStorage.setItem("isLightMode", true)
    else if (localStorage.getItem("isLightMode") === "false")
        localStorage.setItem("isLightMode", false)
    else 
        localStorage.setItem("isLightMode", true)
}

const themeSwitch = function (event) {
    event.preventDefault();

    if (localStorage.getItem("isLightMode") === "true")
        localStorage.setItem("isLightMode", false);
    else
        localStorage.setItem("isLightMode", true);

    console.log(localStorage.getItem("isLightMode"))

    applyTheme();
}

function applyTheme() {
    console.log(document.querySelector("html"))
    if (localStorage.getItem("isLightMode") === "true") {
        document.querySelector("html").classList.add("theme-light");
        document.querySelector("html").classList.remove("theme-dark");
        document.querySelector("html").classList.add("has-background-info-light");
        document.querySelector("html").classList.remove("has-background-info-dark");
        document.querySelector("#theme-switch").classList.add("has-background-warning-light");
        document.querySelector("#theme-switch").classList.remove("has-background-warning-dark");
        document.querySelector(".footer").classList.add("has-background-info-light");
        document.querySelector(".footer").classList.remove("has-background-info-dark");
    } else {
        document.querySelector("html").classList.add("theme-dark");
        document.querySelector("html").classList.remove("theme-light");
        document.querySelector("html").classList.add("has-background-info-dark");
        document.querySelector("html").classList.remove("has-background-info-light");
        document.querySelector("#theme-switch").classList.add("has-background-warning-dark");
        document.querySelector("#theme-switch").classList.remove("has-background-warning-light");
        document.querySelector(".footer").classList.add("has-background-info-dark");
        document.querySelector(".footer").classList.remove("has-background-info-light");
    }
}

function init() {
    themeCheck();
    applyTheme();
    document.querySelector("#finished-voting").setAttribute("style", "display: none;");
    movieListRefresh();
    movieSuggestionForm.querySelector("#suggest").addEventListener("click", suggestMovie);
    movieSuggestionForm.querySelector("#clear").addEventListener("click", clearMovies);
    document.querySelector("#reset").addEventListener("click", resetVoting);
    document.querySelector("#finish-voting").addEventListener("click", finishVotingModal);
    document.querySelector("#finish-voting-deny").addEventListener("click", function () {document.querySelector("#finish-voting-modal").classList.remove("is-active");});
    document.querySelector("#finish-voting-accept").addEventListener("click", finishVotingAccept);
    document.querySelector("#theme-switch").addEventListener("click", themeSwitch);
}

init();