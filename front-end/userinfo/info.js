import { forwardRequest } from "../util/requestSender.js";


function checkToken() {
    
    let tokenn = sessionStorage.getItem('token');

    
    if (tokenn) {
        console.log('Token exists:', tokenn);
        
        document.querySelector('.check').style.display = 'block'; 
    } else {
        console.log('Token does not exist.');
        
        document.querySelector('.container').innerHTML = `
            <div style="
            color:rgb(34, 43, 43);
    background-color: white;
    padding: 20px;
    margin :15% auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 50%;
    height:30%;
    font-weight:bold ;
>

<p> Can't load this page. Please 
 <a href="../signIn/signIn.html">Sign In</a> 
 first.</p>  
 
 </div>`;
         
        
    }
}
window.addEventListener('load', checkToken);
