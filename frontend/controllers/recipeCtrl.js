let recipes = [];

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
        // ezt folytatni kell :,,(
        // receptek 9. sornál tartok
    });
    

}
