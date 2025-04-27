export const getDietPlan=()=>{

    const response= fetch(`https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${process.env.API_KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if(response)
    {
        return response.json()
    }

    else
    {
        console.log('Error fetching diet plan')
    }







}