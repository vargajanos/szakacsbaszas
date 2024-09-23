let recipes = [];

let kategoriak = [];
let selectedkategoriak = [];

function addRecipe(){
    let newRecipe={
        userID: loggedUser[0].ID,
        title: document.querySelector('#title').value,
        additions: document.querySelector('#additions').value,
        description: document.querySelector('#description').value,
        time: document.querySelector('#time').value,
        calory: document.querySelector('#calory').value,
        category: selectedkategoriak
    }
   

    axios.post(`${serverUrl}/recipe`, newRecipe).then(res=>{
        alert(res.data);
        
        if(res.status == 200){
            document.querySelector('#title').value = null
            document.querySelector('#additions').value = null
            document.querySelector('#description').value = null
            document.querySelector('#time').value = null
            document.querySelector('#calory').value = null
            document.querySelector('#selectedCategoryList').innerHTML = ""
            selectedkategoriak = null
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

function getRecipes(){
    axios.get(`${serverUrl}/recipes`).then(res=>{
        recipes = res.data
    })
}

function loadRecipes(){
    let receptek = document.querySelector("receptek")

    recipes.forEach(recipe => {
        let card_div = document.createElement("div")
        card_div.classList.add("card")

        let card_body = document.createElement("div")
        card_body.classList.add("card-body")

        let h5 = document.createElement("h5")
        h5.classList.add("card-title")
        h5.innerHTML = recipe.title

        let p = document.createElement("p")
        p.classList.add("card-text")
        p.innerHTML = recipe.description

        card_body.appendChild(h5)
        card_body.appendChild(p)

        accordion_div = document.createElement("div")
        accordion_div.classList.add("accordion")
        
        hozzavalok_div = document.createElement("div")
        hozzavalok_div.classList.add("accordion-item")

        hozzavalok_h2 = document.createElement("h2")
        hozzavalok_h2.classList.add("accordion-header")

        hozzavalok_btn = document.createElement("button")
        hozzavalok_btn.classList("accordion-button")
        hozzavalok_btn.innerHTML = "Hozzávalók"

        hozzavalok_liras = docment.createElement("div")
        hozzavalok_liras.classList.add("accordion-collapse","collapse show")
    });
    

}
