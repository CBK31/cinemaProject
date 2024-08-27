 let movie = JSON.parse(sessionStorage.getItem("movie"));
 console.log(movie);

function renderMovie(movie) {
    const movieContainer = document.getElementById('movie-container');

    const movieCard = `
               <div class="movie-content"> 
               <div class="movie-image">
            <img src="${movie.show.image.medium}" alt="${movie.show.name}">
        </div>

            <div class="movie-info">
                <h1>${movie.show.name}</h1>
                <p class="rating"><strong>Rating:</strong> ★ ${movie.show.rating.average}</p>
                <p class="runtime"><strong>Runtime:</strong> ${movie.show.runtime} min</p>
                <p class="language"><strong>Language:</strong> ${movie.show.language}</p>
                <p class="ended"><strong>Date:</strong> ${movie.show.ended}</p>
                <p class="genres"><strong>Genres:</strong> ${movie.show.genres.join(', ')}</p>
            </div>
            </div>
            
            <div class="movie-description">
                <p>${movie.show.summary}</p>
            
        </div>
    `;

    movieContainer.innerHTML = movieCard;
}


renderMovie(movie);


