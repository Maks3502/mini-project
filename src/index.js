const createBtn = document.querySelector("#createUserButton");



async function usersList () {
    const url = "https://jsonplaceholder.typicode.com/posts";
try{
    const response = await fetch(url)
    const users = await response.json()
    users.forEach(user => {
        user
    });
}  
}



// const usersList = async () => {
//     const url = "https://jsonplaceholder.typicode.com/posts";
//     fetch()
// }