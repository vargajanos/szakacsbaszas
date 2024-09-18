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