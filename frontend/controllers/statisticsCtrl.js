let recipe = []
let mostCommonUser = "";

function getStats(){
    axios.get(`${serverUrl}/mostCommonUser}`).then(res => {
        mostCommonUser = res.data;
    });

    axios.get(`${serverUrl}/recipes`).then(res=>{
        recipe = res.data
    })

    let totalValue = 0;
    let minValue = Number.MAX_VALUE;
    let maxValue = 0;

    recipe.forEach(item => {
        totalValue += item.count;
        if (item.calory > maxValue){
            maxValue = item.count;
        }
        if (item.calory < minValue){
            minValue = item.count;
        }
        console.log(totalValue);
        console.log(minValue);
        console.log(maxValue);
    });




    document.querySelector('#total').innerHTML = totalValue;
    document.querySelector('#min').innerHTML = minValue;
    document.querySelector('#max').innerHTML = maxValue;
    document.querySelector('#user').innerHTML = mostCommonUser;
}