import { forwardRequest } from "../util/requestSender.js";


function checkToken() {
    
    let tokenn = sessionStorage.getItem('token');

    
    if (tokenn) {
        console.log('Token exists:', tokenn);
        //div creation
     let container =   document.createElement("div");
     let infoBlock = document.createElement("div");
     let block =document.createElement("div"); 
     let scdblock =document.createElement("div"); 
     let link  = document.createElement("a");
     let favmovies =document.createElement("div");
     link.href= "../pass/newpass.html";
     link.textContent="🔑";
     let logoutlink  = document.createElement("a");
     logoutlink.href="#";
    
     let image = document.createElement('img');
image.src = "front-end/userinfo/logouticon.png";  
image.width = '20px';  
image.height = '20px'; 


     //style 
container.classList.add("container");
infoBlock.classList.add("infoBlock");
block.classList.add("block");
scdblock.classList.add("block");
favmovies.classList.add("favmovies");
link.classList.add("changePassword");



/* block.innerHTML = `
<p>First Name: <span class="field">${}</span></p>
<p>Last Name: <span class="field">${}</span></p>
<p>Phone Number: <span class="field">${}</span></p>
<p>Birth Date:<span class="field">${}</span></p>
`;

scdblock.innerHTML =`
        <p>Email:  <span class="field">${}</span></p>
      <p>Change Password? </p>
        <p>Log Out</p>
    `; */
    

    
//append 

scdblock.appendChild(link);
logoutlink.appendChild(image);
scdblock.appendChild(logoutlinklink);

infoBlock.append(block , scdblock);



logoutlink.addEventListener('click', function(event) {
   event.preventDefault();

    console.log('Logged out!');

    sessionStorage.clear();
    window.location.href="../homePage/index.html";


});









    } else {
        console.log('Token does not exist.');

        let errorcontainer =   document.createElement("div"); 
         errorcontainer.classList.add("errorcontainer");
            let link = document.createElement("a");
              let parg = document.createElement("p");
             
              link.href="../signIn/signIn.html";
              link.textContent ="sign in"
              
              parg.innerText="Can't load this page. Please "
      
parg.appendChild(link);
parg.append(" first.");

errorcontainer.appendChild(parg);
        document.body.appendChild(errorcontainer);
              
    
    }
         
        
    }

window.addEventListener('load', checkToken);

