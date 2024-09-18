let kategoriak = [];
let selectedkategoriak = [];

function addRecipe(){
    let newRecipe={
        userID: loggedUser[0].ID,
        title: document.querySelector('#title').value,
        additions: document.querySelector('#additions').value,
        description: document.querySelector('#description').value,
        time: document.querySelector('#time').value,
        calory: document.querySelector('#calory').value
    }

    axios.post(`${serverUrl}/recipe`, newRecipe).then(res=>{
        alert(res.data);

        if(res.status == 202){
            document.querySelector('#title').value = null
            document.querySelector('#additions').value = null
            document.querySelector('#description').value = null
            document.querySelector('#time').value = null
            document.querySelector('#calory').value = null
        }
    })
}


function katFelvetel(){
    let data ={
        name:document.querySelector('#kat').value
    }

    axios.post(`${serverUrl}/categorys`, data).then(res=>{

        alert(res.data)
    })

    katLekeres();
}

function katLekeres(){

    axios.get(`${serverUrl}/categorys`).then(res=>{
        kategoriak = res.data;
        katFeltoltes()
    })
    
}

function katFeltoltes(){
    
    let categoryList = document.querySelector('#categoryList')
    categoryList.innerHTML = "";

    kategoriak.forEach(item => {
        let li = document.createElement('li')
        li.innerHTML = item.name
        li.classList.add("dropdown-item")    
        li.onclick = function () {hozzaad(item)};

        categoryList.appendChild(li)
    });
}

function hozzaad(item){

    if ((selectedkategoriak.find((ize) => item.ID == ize.ID)) != null) {
        selectedkategoriak.splice(selectedkategoriak.indexOf(selectedkategoriak.find((ize) => item.ID == ize.ID)),1)
    }
    else{
        selectedkategoriak.push(item)
    }    
    kategoriadropdown();

}
function kategoriadropdown(){


    let selectedCategoryList = document.querySelector('#selectedCategoryList');
    selectedCategoryList.innerHTML = "";

    selectedkategoriak.forEach(i =>{
        let li = document.createElement('li')
        li.innerHTML = i.name
        li.classList.add("list-group-item")   
    
        selectedCategoryList.appendChild(li)
    })  

}