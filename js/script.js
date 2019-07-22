const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us';
const employeeDataArray = [];
const employeeNames = [];
const galleryDiv = document.getElementById('gallery');
let modalDiv = [];
let currentIndex = '';
const modalHTMLArray = [];
let cards;

// Initial data fetch, calls functions to use with fetched JSON data
fetch(randomUserUrl)
    .then(response => response.json())
    .then(data => {
        employeeData = data.results;
        employeeDataArray.push(employeeData);
        generateEmployeeCard(employeeData);
        search();
        showOverlay();
    })
    .catch(err => {
        console.log('Error fetching employee data', err )
    });
    

// Function maps over each employee data object and creates a card div with HTML for each employee
function generateEmployeeCard(data) {

    data.map((employee) => {
        const employeeName = `${employee.name.first} ${employee.name.last}`;
        // adds employee names to a new array for search functionality
        employeeNames.push(employeeName);
        const employeeEmail = `${employee.email}`;
        const employeePic = `${employee.picture.large}`;
        const employeeDateInfo = `${employee.dob.date}`
        const employeeDOB = `${employeeDateInfo.substring(5,7)}/${employeeDateInfo.substring(8,10)}/${employeeDateInfo.substring(0,4)}`

        // create card div & generate HTML
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employeePic}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employeeName}</h3>
                <p class="card-text">${employeeEmail}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;
        galleryDiv.appendChild(cardDiv);

        // create modal pop-up & generate HTML. Default to display = none

        modalDivHTML = `
            <div class='modal'>
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employeePic}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employeeName}</h3>
                    <p class="modal-text">${employeeEmail}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.cell}</p>
                    <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${employeeDOB}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        `;
        modalHTMLArray.push(modalDivHTML);
    })
    modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container';
    modalDiv.style.display = 'none';
    galleryDiv.appendChild(modalDiv);
}

// function to display the modal corresponding to the click event target, and give functionality to its buttons

function showOverlay() {
    cards = document.querySelectorAll('.card'); 

    // shows adds corresponding HTML to modalDiv based on selected card index
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            currentIndex = index;
            modalDiv.innerHTML = modalHTMLArray[currentIndex];
            modalDiv.style.display = 'block';
        })
    })

    // gives functionality to modal buttons
    modalDiv.addEventListener('click', (e) => {
        let next = currentIndex + 1;
        let prev = currentIndex - 1;
        // decreases currentIndex and changes modalDiv HTML
        if (e.target.id === 'modal-prev' || e.target.textContent === 'Prev') {
            if (currentIndex > 0){
                modalDiv.innerHTML = modalHTMLArray[prev];
                currentIndex = prev;
            } else {
                currentIndex = 0;
            }
        // increases currentIndex and changes modalDiv HTML
        } else if (e.target.id === 'modal-next' || e.target.textContent === 'Next') {
            if (currentIndex === cards.length - 1){
                currentIndex = cards.length - 1;
            } else if (currentIndex < cards.length) {
                modalDiv.innerHTML = modalHTMLArray[next];
                currentIndex = next;
            }
        } 
        // closes modal
        else if( e.target.textContent === 'X' ) {
            modalDiv.style.display = 'none';
        }
    })
};

// adds search bar and gives functionality
function search() {
    
    // create search box
    const searchDiv = document.querySelector('.search-container');
    const searchForm = document.createElement('form');
    searchForm.setAttribute('action', '#');
    searchForm.setAttribute('method', 'get');
    searchForm.innerHTML = `
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    `;
    searchDiv.appendChild(searchForm);

    const searchInput = document.querySelector('#search-input');

    // search function, to be called on certain events listed below
    const searchFunc = () => {
        const userSearch = searchInput.value.toLowerCase();
        employeeNames.forEach((name, index) => {
            if(name.toLowerCase().includes(userSearch)){
                cards[index].style.display = 'flex';
            } else {
                cards[index].style.display = 'none';
            }
        })
    }

    searchInput.addEventListener('keyup', () => {
        searchFunc();
    });
    const searchSubmit = document.querySelector('#search-submit')
    searchSubmit.addEventListener('click', () => {
        searchFunc();
    });

}
