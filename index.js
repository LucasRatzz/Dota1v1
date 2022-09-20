const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json());
app.use(cors())
const port = 3000
const { createHero } = require('./createHero')

const ogre = createHero("ogre", 1, { str: 23, agi: 15, int: 15 }, 200, 75, 40, 5, 1.7)
const mars = createHero("mars", 1, { str: 23, agi: 20, int: 21 }, 200, 75, 34, -1, 1, 7)

const heroes = [ogre, mars]

app.get('/heroes', (req, res) => {
    try {
        const heroesForFrontend = heroes.map(hero => ({
            ...hero,
            armor: hero.armor(),
            reduceDamageByArmor: hero.reduceDamageByArmor(),
            attackPerSecond: hero.attackPerSecond(),
        }))
        res.status(200).send(heroesForFrontend)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error 500")
    }
})

app.get('/heroes/:name', (req, res) => {
    let heroesReq //comeca como undefined
    try {
        let hero = heroes.find(herosito => heroesito.name == req.params.name)
        if (hero)

            heroes.forEach(heroesito => {
                if (heroesito.name == req.params.name) {
                    heroesReq = heroesito
                }
            })
        // js compara valores primitivos (strings, numeros, bool) como valores
        // e tipos complexos como referencia

        if (heroesReq)
            res.status(200).send(heroesReq)
        else
            res.status(400).send("Heroe does not found!")

    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error 500")
    }
})

// app.get('/heroes/:name', (req, res) =>{
//     try {
//         let hero = heroes.find(heroesito => heroesito.name == req.params.name)
//         if (hero)
//             res.status(200).send(hero)
//         else
//             res.status(400).send("Heroe does not found!")

//     } catch (error) {
//         console.error(error)
//         res.status(500).send("Server Error 500")
//     }
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

