// Получаем ссылки на элементы DOM
const createBtn = document.querySelector(".create-user");
const addUserModalBtn = document.querySelector('.add-user-modal');
const inputs = document.querySelectorAll('.box-create-user-form-input');
const modal = document.querySelector('.modal');
const modalSaveButton = document.querySelector('.modal-save-button');
const updateModal = document.querySelector('.modal-update');

let deleteUser = document.querySelectorAll(".btn-delet");
let updateUser = document.querySelectorAll(".btn-Update");


async function fillBoxes(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const boxLists = document.querySelectorAll('.box-list');

        boxLists.forEach((box, index) => {
            if (data[index]) {
                const titleElement = box.querySelector('.box-title');
                const textElement = box.querySelector('.box-text');
                
                titleElement.textContent = data[index].name;
                textElement.textContent = data[index].text;
            }
        });
    } catch (error) {
        console.error('Error filling boxes:', error);
    }
}


fillBoxes("./src/db.json");


createBtn.addEventListener('click', function(event) {
    modal.style.display = 'block'; 
});


window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'; 
    }
});


addUserModalBtn.addEventListener('click', async function(event) {
    event.preventDefault(); 

    const name = inputs[0].value;
    const text = inputs[1].value;

  
    const newUserCard = document.createElement('div');
    newUserCard.classList.add('box-list');
    newUserCard.innerHTML = `
        <h2 class="box-title">${name}</h2>
        <p class="box-text">${text}</p>
        <button class="btn-delet">delete</button>
        <button class="btn-Update">Update</button>
    `;

   
    document.querySelector('.hero-box').appendChild(newUserCard);

   

   
    deleteUser = document.querySelectorAll(".btn-delet");
    updateUser = document.querySelectorAll(".btn-Update");

    
    newUserCard.querySelector('.btn-delet').addEventListener('click', function() {
       
        newUserCard.remove();
    });

    newUserCard.querySelector('.btn-Update').addEventListener('click', function() {
        
        showModalForUpdate(newUserCard);
    });

 
    modal.style.display = 'none';
});

async function saveToJSON(userData, cardElement) {
    try {
        const response = await fetch("./src/db.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to save user data to JSON file.');
        }

        
        const titleElement = cardElement.querySelector('.box-title');
        const textElement = cardElement.querySelector('.box-text');
        titleElement.textContent = userData.name;
        textElement.textContent = userData.text;
    } catch (error) {
        console.error('Error saving user data:', error);
    }
}


deleteUser.forEach(button => {
    button.addEventListener('click', function() {
      
        this.parentElement.remove();
    });
});


updateUser.forEach(button => {
    button.addEventListener('click', function() {
  
        showModalForUpdate(this.parentElement);
    });
});


function showModalForUpdate(cardElement) {
    
    const titleElement = cardElement.querySelector('.box-title');
    const textElement = cardElement.querySelector('.box-text');
    
    
    document.getElementById('nameInput').value = titleElement.textContent;
    document.getElementById('textInput').value = textElement.textContent;

   
    updateModal.style.display = 'block';


    document.getElementById('updateButton').addEventListener('click', async function() {
      
        titleElement.textContent = document.getElementById('nameInput').value;
        textElement.textContent = document.getElementById('textInput').value;

        await saveToJSON({ name: titleElement.textContent, text: textElement.textContent });

      
        updateModal.style.display = 'none';

       
        this.removeEventListener('click', arguments.callee);
    });
}
async function updateCard(cardElement, newData) {
    try {
        const titleElement = cardElement.querySelector('.box-title');
        const textElement = cardElement.querySelector('.box-text');

       
        titleElement.textContent = newData.name;
        textElement.textContent = newData.text;

        await saveToJSON(newData, cardElement);
    } catch (error) {
        console.error('Error updating card:', error);
    }
}
