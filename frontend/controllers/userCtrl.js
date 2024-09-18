function login(){
    let user={
        email: document.querySelector('#email').value,
        passwd: document.querySelector('#passwd').value
    }

    axios.post(`${serverUrl}/login`, user).then(res=>{

        if (res.status != 202) {
            alert(res.data);
            return;
        }

        loggedUser = res.data;
        localStorage.setItem('szakacs', JSON.stringify(loggedUser));
        renderNavItems();
        render('receptek');

    })
}

function registration(){
    let newUser={
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        passwd: document.querySelector('#passwd').value,
        confirm: document.querySelector('#confirm').value,
        phone: document.querySelector('#phone').value
    }

    console.log(newUser)

    axios.post(`${serverUrl}/reg`, newUser).then(res=>{
        alert(res.data);       
    })
    
}