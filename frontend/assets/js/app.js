const serverUrl = 'http://localhost:3000';

let loggedUser = null;

async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();
 
    switch(view){
    }
}