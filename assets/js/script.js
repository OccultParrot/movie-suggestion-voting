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
        upVoteEl.classList.add("is-success");
        upVoteEl.classList.add("upvote");
        upVoteEl.addEventListener("click", upVote)

        const downVoteEl = document.createElement("button");
        downVoteEl.classList.add("button");
        downVoteEl.classList.add("is-danger");
        downVoteEl.classList.add("downvote");
        downVoteEl.addEventListener("click", downVote);

        titleEl.textContent = movie.title;
        descriptionEl.textContent = movie.description;
        upVoteEl.innerHTML = "<i class=\"fa-solid fa-thumbs-up\"></i>";
        downVoteEl.innerHTML = "<i class=\"fa-solid fa-thumbs-down\"></i>";

        voteButtonsEl.appendChild(upVoteEl);
        voteButtonsEl.appendChild(downVoteEl);

        movieEl.appendChild(titleEl);
        movieEl.appendChild(descriptionEl);
        movieEl.appendChild(voteButtonsEl);
        movieListEl.appendChild(movieEl);
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
            // TODO: Remove this testing console.log
            console.log(`Upvoted ${movie.title}. Current score: ${movie.points}, Total votes: ${movie.votes}.\n[THIS CONSOLE LOG IS FOR TESTING PURPOSES AND WILL BE REMOVED]`)
            
            // We break so that if they have a LOT of movies it doesn't have to go through them ALL unless its the last one lol
            break;
        }
    }

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
            // TODO: Remove this testing console.log
            console.log(`Downvoted ${movie.title}. Current score: ${movie.points}, Total votes: ${movie.votes}.\n[THIS CONSOLE LOG IS FOR TESTING PURPOSES AND WILL BE REMOVED]`)
            
            // We break so that if they have a LOT of movies it doesn't have to go through them ALL unless its the last one lol
            break;
        }
    }

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

// TODO: Make a way to finish voting
const finishVoting = function (event) {
    document.querySelector("#finished-voting").setAttribute("display", "block");
    document.querySelector("#voting").setAttribute("display", "none");
    const movieList = JSON.parse(localStorage.getItem("MovieArray"));
    let highestMovie = {
        points: 0
    };
    for (const movie of movieList) {
        if (movie.points > highestMovie.points) {
            highestMovie = movie;
        }
    }
    console.log(highestMovie.title);
}

const resetVoting = function (event) {
    document.querySelector("#finished-voting").setAttribute("display", "none");
    document.querySelector("#voting").setAttribute("display", "block");
}

function init() {
    movieListRefresh();
    movieSuggestionForm.querySelector("#suggest").addEventListener("click", suggestMovie);
    movieSuggestionForm.querySelector("#clear").addEventListener("click", clearMovies);
}

init();