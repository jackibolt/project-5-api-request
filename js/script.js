const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us';
const employeeDataArray = [];
const employeeNames = [];
const galleryDiv = document.getElementById('gallery');
let modalDiv;
let currentIndex;


// Initial data fetch, calls generateEmployeeCard function with fetched JSON data
fetch(randomUserUrl)
    .then(response => response.json())
    .then(data => {
        employeeData = data.results;
        employeeDataArray.push(employeeData);
        generateEmployeeCard(employeeData);
    })
    .then(showOverlay)
    .catch(err => {
        console.log('Error fetching employee data', err )
    });
    


// Function maps over each employee data object and creates a card div with HTML for each employee
function generateEmployeeCard(data) {
    console.log(data)
    data.map((employee, index) => {
        const employeeName = `${employee.name.first} ${employee.name.last}`;
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
        modalDiv = document.createElement('div');
        modalDiv.className = 'modal-container';
        modalDiv.setAttribute('data-index', `${index}`);
        modalDiv.style.display = 'none';
        modalDiv.innerHTML = `
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
        galleryDiv.appendChild(modalDiv);
    })
}



// function to display the modal corresponding to the click event target, and give functionality to its buttons
function showOverlay() {
    const cards = document.querySelectorAll('.card');
    const modalDivs = document.querySelectorAll('.modal-container');
    
    //helper function to hide the modal divs when correct event target is clicked
    const hideModalDivs = () => { 
        modalDivs.forEach(div => {
            div.style.display = 'none';
        })
    }

    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            currentIndex = index;
            console.log(currentIndex);
            modalDivs[currentIndex].style.display = 'block';
        })
    })

    // closes modal when X is clicked
    const closeX = document.querySelector('.modal-close-btn');
    closeX.forEach(x => {
        x.addEventListener('click', () => {
            hideModalDivs();
        })
    })
}


const modalPrev = document.querySelectorAll('.modal-prev');
modalPrev.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(currentIndex);
        prev = currentIndex - 1;
        console.log(currentIndex);
    })
})