let recipes = [];

let kategoriak = [];
let selectedkategoriak = [];
let editrecipeid = ""
let editkatid = ""

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
   
    
    axios.post(`${serverUrl}/recipe`, newRecipe, authorize()).then(res=>{
        alert(res.data);
        
        if(res.status == 200){
            clearModal()
            getRecipes()
        }
    })    
}

function searchbar() {
    // Declare variables
    var input, filter, a;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    cards = document.getElementsByClassName("card")
    titles = document.getElementsByClassName("card-title");
        
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < cards.length; i++) {
        a = titles[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
          cards[i].style.display = "";
        } else {
          cards[i].style.display = "none";
        }
      }
  }

function katFelvetel(){
    let data ={
        name: document.querySelector('#kat').value
    }

    axios.post(`${serverUrl}/category`, data, authorize()).then(res=>{
        alert(res.data)
        if(res.status == 200){
            document.querySelector('#kat').value = null
        }
    })
}

function katFeltoltes(){

    axios.get(`${serverUrl}/category`).then(res=>{
        kategoriak = res.data;
       
        let categoryList = document.querySelector('#categoryList')
        categoryList.innerHTML = "";
    
        kategoriak.forEach(item => {
        let li = document.createElement('li')
        li.innerHTML = item.name
        li.classList.add("dropdown-item")    
        li.onclick = function () {hozzaad(item)};

        categoryList.appendChild(li)
    });
    })
    
    
    
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
    axios.get(`${serverUrl}/recipe`).then(res=>{
        recipes = res.data
        let receptek = document.querySelector("#receptek")
        receptek.innerHTML = ""
        
        recipes.forEach(item => {
            axios.get(`${serverUrl}/recipe/${item.ID}`).then(res=>{
                item.category = res.data
                loadRecipe(item)
            })
        })
    })

}

function loadRecipe(recipe){
    let receptek = document.querySelector("#receptek")
    
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
        card_div.appendChild(card_body)

        accordion_div = document.createElement("div")
        accordion_div.classList.add("accordion")
        
        // hozzávalók
        hozzavalok_div = document.createElement("div")
        hozzavalok_div.classList.add("accordion-item")

        hozzavalok_h2 = document.createElement("h2")
        hozzavalok_h2.classList.add("accordion-header")

        hozzavalok_btn = document.createElement("button")
        hozzavalok_btn.classList.add("accordion-button", "collapsed")
        hozzavalok_btn.setAttribute("data-bs-target", `#${recipe.ID}-hozzavalok`)
        hozzavalok_btn.setAttribute("data-bs-toggle", `collapse`)
        hozzavalok_btn.setAttribute("type", `button`)
        hozzavalok_btn.innerHTML = "Hozzávalók"

        hozzavalok_h2.appendChild(hozzavalok_btn)
        hozzavalok_div.appendChild(hozzavalok_h2)

        hozzavalok_szoveg_div = document.createElement("div")
        hozzavalok_szoveg_div.classList.add("accordion-collapse","collapse")
        hozzavalok_szoveg_div.setAttribute("id", `${recipe.ID}-hozzavalok`)

        hozzavalok_szoveg = document.createElement("div")
        hozzavalok_szoveg.classList.add("accordion-body")
        hozzavalok_szoveg.innerHTML = recipe.additions
        
        hozzavalok_szoveg_div.appendChild(hozzavalok_szoveg)
        hozzavalok_div.appendChild(hozzavalok_szoveg_div)

        accordion_div.appendChild(hozzavalok_div)
        // hozzávalók vége

        // idő
        ido_div = document.createElement("div")
        ido_div.classList.add("accordion-item")

        ido_h2 = document.createElement("h2")
        ido_h2.classList.add("accordion-header")

        ido_btn = document.createElement("button")
        ido_btn.classList.add("accordion-button", "collapsed")
        ido_btn.setAttribute("data-bs-target", `#${recipe.ID}-ido`)
        ido_btn.setAttribute("data-bs-toggle", `collapse`)
        ido_btn.setAttribute("type", `button`)
        ido_btn.innerHTML = "Elkészítési idő"

        ido_h2.appendChild(ido_btn)
        ido_div.appendChild(ido_h2)

        ido_szoveg_div = document.createElement("div")
        ido_szoveg_div.classList.add("accordion-collapse","collapse")
        ido_szoveg_div.setAttribute("id", `${recipe.ID}-ido`)

        ido_szoveg = document.createElement("div")
        ido_szoveg.classList.add("accordion-body")
        ido_szoveg.innerHTML = recipe.time + " idő"
        
        ido_szoveg_div.appendChild(ido_szoveg)
        ido_div.appendChild(ido_szoveg_div)

        accordion_div.appendChild(ido_div)
        // idő vége

        // kalória
        calory_div = document.createElement("div")
        calory_div.classList.add("accordion-item")

        calory_h2 = document.createElement("h2")
        calory_h2.classList.add("accordion-header")

        calory_btn = document.createElement("button")
        calory_btn.classList.add("accordion-button", "collapsed")
        calory_btn.setAttribute("data-bs-target", `#${recipe.ID}-calory`)
        calory_btn.setAttribute("data-bs-toggle", `collapse`)
        calory_btn.setAttribute("type", `button`)
        calory_btn.innerHTML = "Kalória"

        calory_h2.appendChild(calory_btn)
        calory_div.appendChild(calory_h2)

        calory_szoveg_div = document.createElement("div")
        calory_szoveg_div.classList.add("accordion-collapse","collapse")
        calory_szoveg_div.setAttribute("id", `${recipe.ID}-calory`)

        calory_szoveg = document.createElement("div")
        calory_szoveg.classList.add("accordion-body")
        calory_szoveg.innerHTML = recipe.calory + " kalória"
        
        calory_szoveg_div.appendChild(calory_szoveg)
        calory_div.appendChild(calory_szoveg_div)

        accordion_div.appendChild(calory_div)
        // kalória vége

        //kategoria
        category_div = document.createElement("div")
        category_div.classList.add("accordion-item")

        category_h2 = document.createElement("h2")
        category_h2.classList.add("accordion-header")

        category_btn = document.createElement("button")
        category_btn.classList.add("accordion-button", "collapsed")
        category_btn.setAttribute("data-bs-target", `#${recipe.ID}-category`)
        category_btn.setAttribute("data-bs-toggle", `collapse`)
        category_btn.setAttribute("type", `button`)
        category_btn.innerHTML = "Kategória"

        category_h2.appendChild(category_btn)
        category_div.appendChild(category_h2)

        category_szoveg_div = document.createElement("div")
        category_szoveg_div.classList.add("accordion-collapse","collapse")
        category_szoveg_div.setAttribute("id", `${recipe.ID}-category`)

        category_szoveg = document.createElement("ul")
        category_szoveg.classList.add("accordion-body", "list-group", "p-2")

        recipe.category.forEach(i =>{
            let li = document.createElement('li')
            li.innerHTML = i.name
            li.classList.add("list-group-item")   
        
            category_szoveg.appendChild(li)
        })  

        category_szoveg_div.appendChild(category_szoveg)
        category_div.appendChild(category_szoveg_div)

        accordion_div.appendChild(category_div)
        //kategoria vege       
        
        // módosít button
        if(loggedUser){
            if(loggedUser[0].status != 1 &&( recipe.userID == loggedUser[0].ID || loggedUser[0].role == "admin")){
                edit_div = document.createElement("div")
                edit_div.classList.add("accordion-item", "d-flex")
    
                edit_btn = document.createElement("button")
                edit_btn.classList.add("btn", "btn-primary", "m-2", "flex-fill")
                edit_btn.innerHTML = "Módosít"
                edit_btn.setAttribute("data-bs-target", "#exampleModal")
                edit_btn.setAttribute("data-bs-toggle", "modal")
                edit_btn.onclick = function() {editRecipeLoad(recipe)}
    
                edit_div.appendChild(edit_btn)
    
                // töröl button
                delete_btn = document.createElement("button")
                delete_btn.classList.add("btn", "btn-danger", "m-2", "flex-fill")
                delete_btn.innerHTML = "Törlés"
                delete_btn.onclick = function() {deleteRecipe(recipe)}
    
                edit_div.appendChild(delete_btn)
                accordion_div.appendChild(edit_div)
                // töröl button vége
            }
        }
        // módosít button vége

        card_div.appendChild(accordion_div)
        receptek.appendChild(card_div)

    
}

function editRecipeLoad(recipe){
    document.querySelector("#editRecipeBtn").classList.remove("d-none")
    document.querySelector("#addRecipeBtn").classList.add("d-none")
    document.querySelector('#title').value = recipe.title
    document.querySelector('#additions').value = recipe.additions
    document.querySelector('#description').value = recipe.description
    document.querySelector('#time').value = recipe.time
    document.querySelector('#calory').value = recipe.calory
    let fiam = document.querySelector('#selectedCategoryList')
    fiam.innerHTML = "";
    selectedkategoriak = recipe.category
    recipe.category.forEach(i =>{
        
        let li = document.createElement('li')
        li.innerHTML = i.name
        li.classList.add("list-group-item")   
    
        fiam.appendChild(li)
    }) 
    editrecipeid = recipe.ID
    //recept módosítása
}

function editRecipe(){
    let data =
    {
        ID: editrecipeid,
        title: document.querySelector('#title').value,
        additions: document.querySelector('#additions').value,
        description: document.querySelector('#description').value,
        time: document.querySelector('#time').value,
        calory: document.querySelector('#calory').value,
        category: selectedkategoriak
    }
    
    axios.patch(`${serverUrl}/recipe`, data, authorize()).then(res=>{
        if(res.status == 200){
            getRecipes()
        }
    })
}

function deleteRecipe(recipe){

    if (confirm("Biztos törölni akarod?")) {
        axios.delete(`${serverUrl}/recipe/${recipe.ID}`, authorize()).then(res=>{
            alert(res.data)

            getRecipes();
        })
    }
    
    // recept törlése
}

function clearModal(){
    document.querySelector('#title').value = null
    document.querySelector('#additions').value = null
    document.querySelector('#description').value = null
    document.querySelector('#time').value = null
    document.querySelector('#calory').value = null
    document.querySelector('#selectedCategoryList').innerHTML = ""

    document.querySelector("#editRecipeBtn").classList.add("d-none")
    document.querySelector("#addRecipeBtn").classList.remove("d-none")
    selectedkategoriak = [];
}

function kategoriaListLoad(){
    axios.get(`${serverUrl}/category`).then(res=>{
        kategoriak = res.data;
        
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        kategoriak.forEach(kategoria => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            
            td1.innerHTML = kategoria.name;            
            
            let btn1 = document.createElement('button');

            btn1.innerHTML = 'Módosítás';
            btn1.classList.add('btn','btn-warning', 'btn-sm', 'me-2');
            btn1.setAttribute("data-bs-target", "#kategoriaModal")
            btn1.setAttribute("data-bs-toggle", "modal")
            btn1.onclick = function() {updateCatLoad(kategoria)}

            td2.classList.add("text-end")
            td2.appendChild(btn1);

            tr.appendChild(td1);
            tr.appendChild(td2);

            tbody.appendChild(tr);
        });

        let total = document.querySelector('strong');
        total.innerHTML = kategoriak.length;
    })
}

function updateCatLoad(kategoria){
    document.querySelector("#name").value = kategoria.name
    editkatid = kategoria.ID
}

function updateCat(){
    let data = {
        name: document.querySelector("#name").value
    }
    
    axios.patch(`${serverUrl}/category/${editkatid}`, data, authorize()).then(res=>{
        if(res.status == 200){
            kategoriaListLoad()
        }
    })
}