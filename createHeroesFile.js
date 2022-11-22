const axios = require('axios')
const fs = require('fs') // fs.promises.writefile

const getHeroesImg = async () => {
    const token = process.env.APIHEROIMG
    const response = await axios.get("https://dota2-heroes.p.rapidapi.com/heroes/english", {headers: {"X-RapidAPI-Key":token}})
    let JSONResponseData = JSON.stringify(response.data, null, 4) 
    fs.promises.writeFile('heroesImages.json', JSONResponseData)
    console.log(JSONResponseData)
}
getHeroesImg()
