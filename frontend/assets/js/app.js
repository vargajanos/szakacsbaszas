const serverUrl = 'http://localhost:3000';

let loggedUser = null;

async function render(view){
    let main = document.querySelector('main');
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();
 
    switch(view){
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

    //nincs belepve
    if (loggedUser == null) {
        lgdIn.forEach(item=>{
            item.classList.add('d-none');
        })
        lgdOut.forEach(item=>{
            item.classList.remove('d-none');
        })
        return;    
    }

    lgdIn.forEach(item=>{
        item.classList.remove('d-none');
    })
    lgdOut.forEach(item=>{
        item.classList.add('d-none');
    })
}
renderNavItems();