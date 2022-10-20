const axios = require('axios')
// result.data.['1'].stat.attackRate = 1.4


const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTc5OTk0MzY0MjciLCJ1bmlxdWVfbmFtZSI6InZpb2xlbnRLZW4iLCJTdWJqZWN0IjoiNGFmNzM3MGYtYzdhOC00NmVlLTgzYzUtMDQ1MTUxMzRkODg1IiwiU3RlYW1JZCI6IjM5MTcwNjk5IiwibmJmIjoxNjY2MjMxODUyLCJleHAiOjE2OTc3Njc4NTIsImlhdCI6MTY2NjIzMTg1MiwiaXNzIjoiaHR0cHM6Ly9hcGkuc3RyYXR6LmNvbSJ9.kZRv_HgpXkksN1dFJ8Feyq1fTYlvOuKvJkhd9ytptwg"
    axios.get('https://api.stratz.com/api/v1/Hero', {headers: {Authorization:token}}).then((result) => {
        for (let hero in result.data) {
            
        }
        console.log(result.status, result.data['1'].stat)
})

const hpPerStr = 20
const manaPerInt = 12
// const armorPerAgi = 1/6
// const attackSpeedPerAgi = 1

const isPositiveNumber = (number) =>
    !isNaN(number) && number > 0

const isAttributeValid = (attribute) =>
    isPositiveNumber(attribute.str) &&
    isPositiveNumber(attribute.agi) &&
    isPositiveNumber(attribute.int)

// const reduceDamageByArmor = (armor) => {
//     return 1-((0.06 * armor) / (1 + (0.06 * Math.abs(armor))))
// }

const createHero = (name, level, attribute, baseHitpoints, baseMana, baseDamage, baseArmor, baseAttackTime) => {

    if (!name) throw new Error("Invalid Name!")
    if (!isPositiveNumber(level) || level > 30)
        throw new Error("The level must be bigger than 1 and lesser than 30!")
    if (!isAttributeValid(attribute))
        throw new Error("Attribute must be a non negative number")
    if (!isPositiveNumber(baseHitpoints))
        throw new Error("The hitpoints must be a number bigger than 0.")
    if (!isPositiveNumber(baseMana))
        throw new Error("The mana must be a number bigger than 0.")
    if (!isPositiveNumber(baseDamage))
        throw new Error("The damage must be a number bigger than 0.")
    if (isNaN(baseArmor))
        throw new Error("isNaN")


    const newHero = {
        name,
        level,
        str: attribute.str,
        agi: attribute.agi,
        int: attribute.int,
        maxHitPoints: (attribute.str * hpPerStr) + baseHitpoints,
        hitPoints: (attribute.str * hpPerStr) + baseHitpoints,
        maxMana: (attribute.int * manaPerInt) + baseMana,
        mana: (attribute.int * manaPerInt) + baseMana,
        damage: baseDamage,
        baseArmor,
        baseAttackTime,
        armor: function () {
            return this.baseArmor + (this.agi * (1 / 5.9999999999999))
        },
        reduceDamageByArmor: function () {
            return 1 - (0.06 * this.armor() / (1 + 0.06 * Math.abs(this.armor())))
        },
        attackPerSecond: function(){
            return ((100 + this.agi) * 0.01) / this.baseAttackTime
        }
    }
    return newHero
}

const ogre = createHero("ogre", 1, { str: 23, agi: 12, int: 15 }, 200, 75, 40, 28, 1.7)
console.log(ogre)
console.log(ogre.reduceDamageByArmor())
console.log(ogre.attackPerSecond())


module.exports.createHero = createHero