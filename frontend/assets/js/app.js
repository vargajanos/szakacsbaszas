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
    }


}


if (localStorage.getItem('szakacs')){
    loggedUser = JSON.parse(localStorage.getItem('szakacs'));
    render('receptek');
}else{
    render('login');
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

    //admin
    if (loggedUser.role == 'admin'){
        lgdAdmIn.forEach(item => {
            item.classList.remove('d-none');
        });
    }


    //user
    lgdIn.forEach(item=>{
        item.classList.remove('d-none');
    })
    lgdOut.forEach(item=>{
        item.classList.add('d-none');
    })
}
renderNavItems();