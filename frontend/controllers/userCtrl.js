let edituserID = "";

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
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        passwd: document.querySelector('#passwd').value,
        confirm: document.querySelector('#confirm').value,
        phone: document.querySelector('#phone').value
    }

    axios.post(`${serverUrl}/reg`, newUser).then(res=>{
        if(res.status == 202){
            alert(res.data);
            document.querySelector('#name').value = null
            document.querySelector('#email').value = null
            document.querySelector('#passwd').value = null
            document.querySelector('#confirm').value = null
            document.querySelector('#phone').value = null
        }
    })
}
function logout(){
    localStorage.removeItem('szakacs');
    loggedUser = null;
    renderNavItems();
    render('login');
}

function getEn(){

    axios.get(`${serverUrl}/me/${loggedUser[0].ID}`, authorize()).then(res=>{
        document.querySelector('#name').value = res.data[0].name;
        document.querySelector('#email').value = res.data[0].email;
        document.querySelector('#phone').value = res.data[0].phone;
        document.querySelector('#role').value = res.data[0].role;
    })
}

function updateEn(){
    let data ={
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        role: document.querySelector('#role').value,
    }
    axios.patch(`${serverUrl}/users/${loggedUser[0].ID}`, data, authorize()).then(res=>{
        alert(res.data)
    });
}


function getUsers(){
    axios.get(`${serverUrl}/users`, authorize()).then(res => {
        renderUsers(res.data);
    });
}

function updateUser(){
    let data = {
        role: document.querySelector('#role').value,
        status: document.querySelector('#status').value
    }
    axios.patch(`${serverUrl}/users/${edituserID}`, data, authorize()).then(res => {
        alert(res.data);
        getUsers();
    });
}

function updateUserLoad(user){
    document.querySelector('#name').value = user.name
    document.querySelector('#email').value = user.email
    document.querySelector('#phone').value = user.phone
    document.querySelector('#role').value = user.role
    document.querySelector('#status').value = user.status


    edituserID = user.ID;
}


function renderUsers(users){
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        let tr = document.createElement('tr');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let td7 = document.createElement('td');
        
        td2.innerHTML = user.name;
        td3.innerHTML = user.email;
        td4.innerHTML = user.phone;
        td5.innerHTML = user.role;
        td6.innerHTML = user.status;
        
        if (user.ID != loggedUser[0].ID){
            let btn1 = document.createElement('button');


            btn1.innerHTML = 'Edit';
            btn1.classList.add('btn','btn-warning', 'btn-sm', 'me-2');
            btn1.setAttribute("data-bs-target", "#userModal")
            btn1.setAttribute("data-bs-toggle", "modal")
            btn1.onclick = function() {updateUserLoad(user)}

            td7.appendChild(btn1);

        }

        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        tbody.appendChild(tr);
    });

    let total = document.querySelector('strong');
    total.innerHTML = users.length;
}