import { forwardRequest } from "../util/requestSender.js";

async function checkToken() {
  let tokenn = sessionStorage.getItem('token');
  console.log("token: " + tokenn);

  if (tokenn) {
    const data = { token: tokenn };
     
    try {
      const response = await forwardRequest(
        data,
        "POST",
        "http://localhost:3000/user/getinfo"
      );
      console.log(response);
      





      if (response.status === 400) {
        console.log("Error responding");




      } else {
        console.log("Successful response");
        
      
        let container = document.createElement("div");
        let infoBlock = document.createElement("div");
        let block = document.createElement("div"); 
        let scdblock = document.createElement("div"); 
        let changePasswordLink = document.createElement("a");
        let changePasswordImage = document.createElement('img');
        let logoutLink = document.createElement("a");
        let logoutImage = document.createElement('img');
        
        changePasswordLink.href = "../pass/newpass.html"
        changePasswordImage.href = "#";
         changePasswordImage.src = "lockreset.svg";  
         changePasswordImage.width = 30;  
         changePasswordImage.height = 30; 
         changePasswordImage.style.verticalAlign = "middle";

    

        logoutLink.href = "#";
        logoutImage.src = "logout.svg";  
        logoutImage.width = 30;  
        logoutImage.height = 30; 
        logoutImage.style.verticalAlign = "middle";
       
        container.classList.add("container");
        infoBlock.classList.add("infoBlock");
        block.classList.add("block");
        scdblock.classList.add("block");
       
        changePasswordLink.classList.add("changePassword");

        block.innerHTML = `
          <p>First Name: <span class="field">${response.userInfo.firstName}</span></p>
          <p>Last Name: <span class="field">${response.userInfo.lastName}</span></p>
          <p>Phone Number: <span class="field">${response.userInfo.phoneNumber}</span></p>
          <p>Birth Date: <span class="field">${response.userInfo.dob}</span></p>
        `;

        scdblock.innerHTML = `
          <p>Email: <span class="field">${response.userInfo.email}</span></p>
        `;

        
        const changePasswordText = document.createElement("p");
        changePasswordText.textContent=" Change Password? "
        changePasswordLink.appendChild(changePasswordImage);
        changePasswordLink.classList.add("changePassword");
         
        changePasswordText.appendChild(changePasswordLink);
     
        scdblock.appendChild(changePasswordText);

        
        const logoutText = document.createElement("p");
        logoutText.textContent = "Log Out ";
        logoutLink.appendChild(logoutImage);
        logoutText.appendChild(logoutLink);
        scdblock.appendChild(logoutText);


        
        let favmovies = document.createElement("div");
        let favtext =document.createElement('div');
        favtext.textContent="Your Favorites Movies"
        favtext.classList.add("favtext");
        favmovies.classList.add("resultContainer");




resultDisplayer(response.moviesInfo);
function resultDisplayer(rowss) {
  for (let i = 0; i < rowss.length; i++) {
   
    constructElement(
      rowss[i].image,
      rowss[i].name,
      rowss[i].rating,
      rowss[i].movieId,
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
 
  moviePic.classList.add("innerMoviePic");
  movieN.classList.add("movieName");
  movieRate.classList.add("movieRating");
  watchListButtom.classList.add("addToWatchList");

  watchListButtom.setAttribute("id", showId);
  watchListButtom.addEventListener("click", async function () {
    await addMovieToFavorite(showId, watchListButtom, rowss);
  });

  favmovies.appendChild(mainshowCard);

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

async function showMovieDetails(movieId, rowss) {
  let myShow;
  for (let i = 0; i < rowss.length; i++) {
    if (rowss[i].movieId == movieId) {
      myShow = rowss[i];
    }
  }
  console.log(myShow);
  sessionStorage.setItem("movie", JSON.stringify(myShow));
  let moviee = sessionStorage.getItem("movie");

 
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
  moviePicp.src = MoviePicParam;
  movieNp.innerText = MovieNameParam;
  movieRatep.innerText = "★  " + (MovieRateparam * 100).toFixed(2) + " % ";
  watchListButtomp.innerText = "-";
}

let tokenn = sessionStorage.getItem("token");
console.log("my toke : " + tokenn);


async function addMovieToFavorite(showId, watchListButtom, rowss) {
  console.log("my token is here : " + tokenn);
  if (!tokenn || tokenn === undefined) {
    console.log("my token is here : " + tokenn);
  
  }
  if (watchListButtom.innerText.includes("-")) {
    watchListButtom.innerText = "-";
    try {
      const response = await forwardRequest(
        { movieId: showId ,
          token :tokenn,
        },
        "POST",
        "http://localhost:3000/movie/delete"
      );
      if (response.status == 400) {
       
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    let myShow;
    for (let i = 0; i < rowss.length; i++) {
      if (rowss[i].movieId == showId) {
        myShow = rowss[i];
      }
    }
    watchListButtom.innerText = "-";
  
  }
}




      
        infoBlock.append(block, scdblock);
        container.append(infoBlock,favtext, favmovies);
        document.body.appendChild(container);

        
        logoutLink.addEventListener('click', function(event) {
          event.preventDefault();
          console.log('Logged out!');
          sessionStorage.clear();
          window.location.href = "../homePage/index.html";
        });



      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.log('Token does not exist.');

    let errorcontainer = document.createElement("div"); 
    errorcontainer.classList.add("errorcontainer");
    let link = document.createElement("a");
    let parg = document.createElement("p");

    link.href = "../signIn/signIn.html";
    link.textContent = "sign in";
    parg.innerText = "Can't load this page. Please ";
    parg.appendChild(link);
    parg.append(" first.");

    errorcontainer.appendChild(parg);
    document.body.appendChild(errorcontainer);
  }
}

window.addEventListener('load', checkToken);
