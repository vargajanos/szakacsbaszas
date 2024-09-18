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
        localStorage.setItem('szakacs', JSON.stringify(loggedUser));;
        renderNavItems();
        render('receptek');

    })
}

function registration(){
    let newUser={
        email: document.querySelector('#email').value,
        passwd: document.querySelector('#passwd').value
    }

    axios.post(`${serverUrl}/login`, newUser).then(res=>{

        if (res.status != 202) {
            alert(res.data);
            return;
        }

        loggedUser = res.data;
        



    })
}

function logout(){
    localStorage.removeItem('stepcounter');
    loggedUser = null;
    renderNavItems();
    render('login');
}