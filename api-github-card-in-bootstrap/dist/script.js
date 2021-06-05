const usernamePre = document.getElementById('username');
const alertduplicateuserMessage = document.getElementById('alertUserduplicate');
const alertnouserMessage = document.getElementById('alertnoUser');
let usernameArray = [];

/**
/* Occur event when the button is pushed. This action allows us to push the username into variable username.
@param {string} username - github username
*/

function getUsername(){
   const username = usernamePre.value;


 // Error Cases
   if(username === '') {
     alertnouserMessage.removeAttribute('id');
     document.getElementById('username').value = '';
     return;
   }
 
   if (!usernameArray.includes(username)){ 
     usernameArray.push(username);
     alertduplicateuserMessage.setAttribute('id', 'alertUserduplicate');
     alertnouserMessage.setAttribute('id', 'alertnoUser');
     getGithubData(username);
   }else {
     alertduplicateuserMessage.removeAttribute('id');
     document.getElementById('username').value = '';
    }
};

/**
/* Occur event when the enter key is pushed. This action allows us to push the username into variable username.
@param {string} username - github username
*/

usernamePre.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    
    getUsername();
  }
});

/**
* Gets github information and tranforms the info into HTML card
* @param {string} username - github username
*/
function getGithubData(username) {
  fetch(`https://api.github.com/users/${username}`)
  .then(response => response.json())
  .then( data => {
         
         createCard(data);
  }).catch( error => console.error(error));
}

/**
/* This function creates HTML card when users push button and data is sent. Also, the username in textbox will be deleted.
@param {string, integer} data 
*/

function createCard(data) {
  console.log(data);
  document.getElementById('username').value = '';
  
  let imgEl = document.createElement('img');
  let h4El = document.createElement('h4');
  let h5El1 = document.createElement('h5');
  let h5El2 = document.createElement('h5');
  const card = document.createElement('div');
  const cardbody = document.createElement('div');

  card.setAttribute('class', 'card-title');
  
  h5El1.innerText = `Follower: ${data.followers}`;
  h5El2.innerText =   `Following: ${data.following}`;
  h4El.innerText = data.name;
  imgEl.src = data.avatar_url;
  card.appendChild(imgEl);
  card.appendChild(h4El);
  card.appendChild(h5El1);
  card.appendChild(h5El2);
 document.getElementById('cardContainer').appendChild(card);
  card.style.width = '240px';
  card.style.border = 'solid 3px black';
 }