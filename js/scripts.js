const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];


// ------------------------------------------
//  FETCH FUNCTIONS
// -----------------------------------------
// one fetch-function for multiple fetches
function fetchData(url) {
    return fetch(url)
           .then(checkStatus)
           .then(res => res.json() )
           .catch(error => console.log('opps looks like there is a problem', error))
  }
  
fetchData('https://randomuser.me/api/?results=12&seed&nat=ca,us,fr,gb,&lego')
    .then(data => { generateCard(data.results);
                    modalClickHandler(data.results);
                    generateFilter();
    })


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// function to check for errors

function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
     }else{
         return Promise.reject(new Error(response.statusText));
     }

}


function generateFilter(){
    const searchContainer = document.getElementsByClassName("search-container")[0];
    const searchInput =document.createElement('div');
    searchInput.innerHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
searchContainer.appendChild(searchInput);
}


//generate individual employee cards based on number on employees return from API
function generateCard(data){
    let employees = data;
    const html= employees.map( (data) => {

    return `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${data.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${data.name.last}, ${data.name.first}</h3>
        <p class="card-text">${data.email}</p>
        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        
    </div>
</div>`}).join('');
gallery.innerHTML = html;

//console.log(data)

}
//function to create the model && what data to display
function generateModal(data,i){
    const modal = document.createElement('div');
    modal.setAttribute('class','modal-container');
    modal.innerHTML =  ` 
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data[i].name.last}, ${data[i].name.first}</h3>
                <p class="modal-text">${data[i].email}</p>
                <p class="modal-text cap">${data[i].location.city}</p>
                <hr>
                <p class="modal-text">${data[i].phone}</p>
                <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name} , ${data[i].location.state} , ${data[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${data[i].dob.date.substr(5,2)}-${data[i].dob.date.substr(8,2)}-${data[i].dob.date.substr(0,4)}
                </p>
            </div>
        </div>
        <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
    
    `;
    return modal;
}


/// append the info to the body && call the closeModal()

function modalClickHandler(data){
    const cards = document.querySelectorAll('.card');
   
   for(let i =0; i< cards.length; i++){
        cards[i].addEventListener('click', () => {
           body.appendChild(generateModal(data,i))
           closeModal();
           
      }) 
   }
   
}
//function to close the model popUp
function closeModal(){
    const modalContainer = document.getElementsByClassName('modal-container')[0];
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener('click', () =>{
        modalContainer.remove();
    });
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

//event listener close modal if outside click
    window.addEventListener('click', () =>{
        const modalContainer = document.getElementsByClassName('modal-container')[0];

        if(event.target == modalContainer){
            modalContainer.remove();
        }
    });