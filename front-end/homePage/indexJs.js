let boll = true;
let timing = 0;
let formInput = document.querySelector(".formclass");
let mainContainer = document.querySelector(".resultContainer");
// import { forwardRequest } from "../util/requestSender";
console.log(formInput);

window.onload = prepaireFetch("veri");

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

      mainContainer.replaceChildren();
      resultDisplayer(results);
    })
    .catch(function (request) {
      console.log("the equest faillss : " + request);
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function resultDisplayer(rowss) {
  for (let i = 0; i < rowss.length; i++) {
    //  const element = array[i];
    //console.log(rowss[i].show.name + " score : " + rowss[i].score);
    constructElement(
      rowss[i].show.image.medium,
      rowss[i].show.name,
      rowss[i].score,
      rowss[i].show.id,
      rowss
    );
  }
}

function constructElement(
  dataMoviePic,
  dataMovieName,
  dataMovieRate,
  showId,
  rowss
) {
  let dataMoviePicParam = dataMoviePic;
  let dataMovieNameParam = dataMovieName;
  let dataMovieRateparam = dataMovieRate;

  let mainshowCard = document.createElement("a");
  let moviePic = document.createElement("img");
  let movieN = document.createElement("p");
  let movieRate = document.createElement("div");
  let watchListButtom = document.createElement("button");

  mainshowCard.append(moviePic, movieN, movieRate, watchListButtom);

  mainshowCard.classList.add("mainShowMovie");
  mainshowCard.addEventListener("click", function () {
    showMovieDetails(showId, rowss);
  });
  mainshowCard.addEventListener("click", function () {
    window.location.href = "../movieInfo/movieInfo.html";
  }); // changed

  moviePic.classList.add("innerMoviePic");
  movieN.classList.add("movieName");
  movieRate.classList.add("movieRating");
  watchListButtom.classList.add("addToWatchList");

  watchListButtom.setAttribute("id", showId);
  watchListButtom.addEventListener("click", async function () {
    await addMovieToFavorite(showId, watchListButtom, rowss);
  });
  mainContainer.appendChild(mainshowCard);

  watchListButtom.addEventListener("click", async function (e) {
    e.stopPropagation();
    await addMovieToFavorite(showId, watchListButtom, rowss);
  });

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
let tokenn = sessionStorage.getItem("token");
console.log("my toke : " + tokenn);

async function addMovieToFavorite(showId, watchListButtom, rowss) {
  console.log("my token is here : " + tokenn);
  if (!tokenn || tokenn === undefined) {
    console.log("my token is here : " + tokenn);
    window.location.href = "../signIn/signIn.html";
    return; //changed
  }

  if (watchListButtom.innerText.includes("-")) {
    try {
      const response = await forwardRequest(
        { movieId: showId, token: tokenn },
        "POST",
        "http://localhost:3000/movie/delete"
      );
      watchListButtom.innerText = "+";
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    let myShow;
    for (let i = 0; i < rowss.length; i++) {
      if (rowss[i].show.id == showId) {
        myShow = rowss[i];
      }
    }

    try {
      const response = await forwardRequest(
        { token: tokenn, movie: myShow },
        "POST",
        "http://localhost:3000/movie/add"
      );
      watchListButtom.innerText = "-";
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

async function showMovieDetails(movieId, rowss) {
  let myShow;
  for (let i = 0; i < rowss.length; i++) {
    if (rowss[i].show.id == movieId) {
      myShow = rowss[i];
    }
  }
  console.log(myShow);
  sessionStorage.setItem("movie", JSON.stringify(myShow));
  let moviee = sessionStorage.getItem("movie");

  // mainshowCard.setAttribute("href", "../signUp/signUp.html");
  // window.location.href = "../movieInfo/movieinfo.html";
}

//
//
//
//

/////
export const forwardRequest = async (body, requestMethod, serviceUrl) => {
  try {
    const response = await axios({
      method: requestMethod,
      url: serviceUrl,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      return {
        status: 500,
        data: {
          message:
            "Internal Server Error - Unable to contact the service : " +
            error.message,
        },
      };
    }
  }
};
