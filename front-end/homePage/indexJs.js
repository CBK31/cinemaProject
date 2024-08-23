let boll = true;
let timing = 0;
let formInput = document.querySelector(".formclass");
let mainContainer = document.querySelector(".resultContainer");
console.log(formInput);
formInput.addEventListener("submit", function (d) {
  d.preventDefault();
});

let input = document.querySelector(".inputMovie");

formInput.addEventListener("keyup", function (e) {
  //   console.log(input.value);
  timingReady();

  function timingReady() {
    if (input.value != "" && e.timeStamp > timing + 1000) {
      console.log(input.value);
      boll = true;
      // fetch reslt thru API
      // prepaireFetch(input.value);
    } else {
      let mytimer = setTimeout(() => {
        if (boll) {
          console.log(input.value);
          boll = false;
          // fetch result thru API
          prepaireFetch(input.value);
        } else {
          clearTimeout(mytimer);
          boll = false;
        }
      }, 3000);
    }
  }
  timing = e.timeStamp;
});

function prepaireFetch(userinput) {
  //console.log("https://api.tvmaze.com/search/shows?q="+userinput.replace(" ","+"));
  myFetcher(
    "https://api.tvmaze.com/search/shows?q=" + userinput.replace(" ", "+")
  );
}

function myFetcher(request) {
  fetch(request)
    .then(function (preResult) {
      return preResult.json();
    })
    .then(function (results) {
      console.log("fetch good");
      console.log(results);
      //console.log("cbk the best : " + results.length);
      resultDisplayer(results);
    })
    .catch(function (request) {
      console.log("the equest faillss : " + request);
    });
}

function resultDisplayer(rowss) {
  for (let i = 0; i < rowss.length; i++) {
    //  const element = array[i];
    //console.log(rowss[i].show.name + " score : " + rowss[i].score);
    constructElement(
      rowss[i].show.image.medium,
      rowss[i].show.name,
      rowss[i].score
    );
  }
}

function constructElement(dataMoviePic, dataMovieName, dataMovieRate) {
  let dataMoviePicParam = dataMoviePic;
  let dataMovieNameParam = dataMovieName;
  let dataMovieRateparam = dataMovieRate;

  let mainshowCard = document.createElement("div");
  let moviePic = document.createElement("img");
  let movieN = document.createElement("p");
  let movieRate = document.createElement("div");
  let watchListButtom = document.createElement("a");

  mainshowCard.append(moviePic, movieN, movieRate, watchListButtom);

  mainshowCard.classList.add("mainShowMovie");
  moviePic.classList.add("innerMoviePic");
  movieN.classList.add("movieName");
  movieRate.classList.add("movieRating");
  watchListButtom.classList.add("addToWatchList");

  mainContainer.appendChild(mainshowCard);

  fillMovieElement(
    dataMoviePicParam,
    dataMovieNameParam,
    dataMovieRateparam,
    moviePic,
    movieN,
    movieRate,
    watchListButtom
  );
}

function fillMovieElement(
  MoviePicParam,
  MovieNameParam,
  MovieRateparam,
  moviePicp,
  movieNp,
  movieRatep,
  watchListButtomp
) {
  // MovieNameParam.append();
  moviePicp.src = MoviePicParam;
  movieNp.innerText = MovieNameParam;
  movieRatep.innerText = "★  " + (MovieRateparam * 100).toFixed(2) + " % ";
  watchListButtomp.innerText = "+";
}
//hayde l session li bt jib l token 
let tokenn = sessionStorage.getItem('token');
console.log(tokenn);