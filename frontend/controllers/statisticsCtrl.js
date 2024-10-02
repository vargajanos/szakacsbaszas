let recipe = []
let mostCommonUser = "";

function getStats(){
    axios.get(`${serverUrl}/recipes/mostCommonUser`, authorize()).then(res => {
        mostCommonUser = res.data;

    axios.get(`${serverUrl}/recipes`).then(res=>{
        recipe = res.data

        let totalValue = recipe.length;
        let minValue = Number.MAX_VALUE;
        let maxValue = 0;

        recipe.forEach(item => {
            if (item.calory > maxValue){
                maxValue = item.calory;
            }
            if (item.calory < minValue){
                minValue = item.calory;
            }

        });


        document.querySelector('#total').innerHTML = totalValue;
        document.querySelector('#min').innerHTML = minValue;
        document.querySelector('#max').innerHTML = maxValue;
        document.querySelector('#user').innerHTML = mostCommonUser[0].name;
        })
    
    });

}