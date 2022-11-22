const axios = require('axios')

const checkHeroes = async () => {
  const token = process.env.APIHERODATA
  const original = await axios.get('https://api.stratz.com/api/v1/Hero', {headers: {Authorization:token}})
  const originalHeroes = Object.keys(original.data).reduce((heroes, id) => heroes.concat(original.data[id]), [])
  // const getOriginalApiHero = (id) => originalHeroes.find(h => h.id == id)

  const newToken = process.env.APIHEROIMG
  const { data: newHeroes } = await axios.get("https://dota2-heroes.p.rapidapi.com/heroes/english", {headers: {"X-RapidAPI-Key":newToken}})
  const getNewApiHero = (id) => newHeroes.find(h => h.id == id)

  originalHeroes.forEach(hero => {
    const newHero = getNewApiHero(hero.id)
    console.log(`${hero.id}:${hero.name}:${newHero.name}`)
  })

  // console.log(getOriginalApiHero(2))
}
checkHeroes()