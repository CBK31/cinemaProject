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
                <p class="rating"><span>Rating:    </span> ★ ${movie.show.rating.average}</p>
                <p class="runtime"><span>Runtime:  </span> ${movie.show.runtime} min</p>
                <p class="language"><span>Language:</span> ${movie.show.language}</p>
                <p class="ended"><span>Date:       </span> ${movie.show.ended}</p>
                <p class="genres"><span>Genres:    </span> ${movie.show.genres.join(', ')}</p>
            </div>
            </div>
            
            <div class="movie-description">
                <p>${movie.show.summary}</p>
            
        </div>
    `;

    movieContainer.innerHTML = movieCard;
}


renderMovie(movie);


