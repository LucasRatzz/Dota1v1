const axios = require('axios')
const fs = require('fs')
// result.data.['1'].stat.attackRate = 1.4

const getHeroImages = async () => {
    const allHeroesImages = []
    const fileContent = await fs.promises.readFile("heroesImages.json",{encoding: "utf8"})
    let heroes = JSON.parse(fileContent)
    // const allHeroesImages = heroes.map((hero) => {
    //     return {
    //         id: hero.id,
    //         imgLink: hero.image,
    //         attributeImg: hero.attribute_img
    //     }
    // })
    // [1,2,3].map(number => {
    //     return number * 2
    // })
    // // [2, 4, 6]

    // [1,2,3].map(number => {
    //     return 'a'
    // })
    // ['a', 'a', 'a']

    for (let heroImg of heroes) {
        const hero = {
            id: heroImg.id,
            imgLink: heroImg.image,
            attributeImg: heroImg.attribute_img
        }
        allHeroesImages.push(hero)
    }
   return allHeroesImages
}

const getAllHeroes = async () => {
    const allHeroes = []
    const token = process.env.APIHERODATA
    const response = await axios.get('https://api.stratz.com/api/v1/Hero', {headers: {Authorization:token}})
    const allHeroesImg = await getHeroImages()
    // response1 = await response
    // response2 = await allHeroesImg
    for (let heroID in response.data) {
        const hero = response.data[heroID]
        const name = hero.displayName
        const attribute = hero.stat.primaryAttribute
        const baseHitpoints = hero.stat.hpBarOffset <= 0 ? 1 : hero.stat.hpBarOffset
        const baseMana = 100 // TODO: Tornar isso dinâmico
        const baseArmor = hero.stat.startingArmor 
        const attackRate = hero.stat.attackRate
        const baseAttackAverage = (hero.stat.startingDamageMin + hero.stat.startingDamageMax) / 2 
        const attributes = {
            str: hero.stat.strengthBase,
            int: hero.stat.intelligenceBase,
            agi: hero.stat.agilityBase,
        }
        let img = allHeroesImg.find(element => {
            if (element.id == heroID) {
                return true
            }
        })
        // iterariam allHeroesImg
        // encontraria o heroi atual, recuperar a imagem e atributo
        // repassar para createHero
        const createdHero = createHero(name, 1, attributes, baseHitpoints, baseMana,baseAttackAverage ,baseArmor,attackRate, attribute, img.attributeImg, img.imgLink)
        allHeroes.push(createdHero)
    }
    return allHeroes
}

const hpPerStr = 20
const manaPerInt = 12
// const armorPerAgi = 1/6
// const attackSpeedPerAgi = 1

const isPositiveNumber = (number) =>
    !isNaN(number) && number > 0

const isAttributeValid = (attribute) =>
    !isNaN(attribute.str) &&
    !isNaN(attribute.agi) &&
    !isNaN(attribute.int)

// const reduceDamageByArmor = (armor) => {
//     return 1-((0.06 * armor) / (1 + (0.06 * Math.abs(armor))))
// }

const createHero = (name, level, attribute, baseHitpoints, baseMana, baseDamage, baseArmor, baseAttackTime, mainAttribute, attributeImg, urlImg) => {

    if (!name) throw new Error("Invalid Name!")
    if (!isPositiveNumber(level) || level > 30)
        throw new Error("The level must be bigger than 1 and lesser than 30!")
    if (!isAttributeValid(attribute))
        throw new Error(`Attribute must be a non negative number ${name} ${JSON.stringify(attribute)}`)
    if (!isPositiveNumber(baseHitpoints))
        throw new Error(`The hitpoints must be a number bigger than 0. ${name} ${baseHitpoints}`)
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
        mainAttribute,
        armor: function () {
            return this.baseArmor + (this.agi * (1 / 5.9999999999999))
        },
        reduceDamageByArmor: function () {
            return 1 - (0.06 * this.armor() / (1 + 0.06 * Math.abs(this.armor())))
        },
        attackPerSecond: function(){
            return ((100 + this.agi) * 0.01) / this.baseAttackTime
        },
        attributeImg,
        urlImg,
    }
    return newHero
}

// const ogre = createHero("ogre", 1, { str: 23, agi: 12, int: 15 }, 200, 75, 40, 28, 1.7)
// console.log(ogre)
// console.log(ogre.reduceDamageByArmor())
// console.log(ogre.attackPerSecond())


module.exports.createHero = createHero
module.exports.getAllHeroes = getAllHeroes