const serverUrl = 'http://localhost:3000';

let loggedUser = null;

async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();
    
    switch(view){
        case 'en':{
            getEn();
            break;
        }
        case 'receptek':{
            if (!loggedUser || loggedUser[0].status == 1) {
                let plus = document.querySelector('#floating-button');
                plus.style.visibility = "hidden";   
            }
            getRecipes();
            katFeltoltes()
            break;   
        }
        case 'felhasznalok':{
            getUsers();
            break;
        }
        case "kategoria":{
            kategoriaListLoad()
            break
        }
        case 'statisztika':{
            getStats();
            break;
        }   
    }
}

render('receptek');

if (localStorage.getItem('szakacs')){
    loggedUser = JSON.parse(localStorage.getItem('szakacs'));
}


function renderNavItems(){
    let lgdOut = document.querySelectorAll('.lgdOut');
    let lgdIn = document.querySelectorAll('.lgdIn');
    let lgdAdmIn = document.querySelectorAll('.lgdAdmIn');


    //nincs belepve
    if (loggedUser == null) {
        lgdIn.forEach(item=>{
            item.classList.add('d-none');
        })
        lgdAdmIn.forEach(item=>{
            item.classList.add('d-none');
        })
        lgdOut.forEach(item=>{
            item.classList.remove('d-none');
        })
        return;    
    }
    //user
    lgdIn.forEach(item=>{
        item.classList.remove('d-none');
    })
    lgdOut.forEach(item=>{
        item.classList.add('d-none');
    })
    lgdAdmIn.forEach(item => {
        item.classList.add('d-none');
    });

    //admin
    if (loggedUser[0].role == 'admin'){
        lgdAdmIn.forEach(item => {
            item.classList.remove('d-none');
        });
        
    }


}
renderNavItems();