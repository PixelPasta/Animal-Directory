const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 5600

app.set('view engine', 'ejs')
app.listen(port, () => {
    console.log(`Listening to ${port}`)
})

app.get('/', async (req, res) => {
    return res.render('index')
})





app.get('/cat', async (req, res) => {
    let content = await fetch(`https://catfact.ninja/fact`)
    content = await content.json()
    let content2 = await fetch(`https://cataas.com/cat?width=300`)
    content2 = await content2.buffer()
    content2 = content2.toString('base64')

    return res.render('cat', {fact: content.fact, buffer:content2})
})



app.get('/Dog', async (req, res) => {
    let content = await fetch(`https://dog-api.kinduff.com/api/facts`)
    content = await content.json()
    let content2 = await fetch(`https://dog.ceo/api/breeds/image/random`)
    content2 = await content2.json()
    content2 = await fetch(content2.message)
    content2 = await content2.buffer()
  
    res.render('Dog', {fact: content.facts[0], buffer: content2.toString('base64')})
})

app.get('/Fish', async (req, res) => {
   
    console.time("timer1");
    let content = await fetch(`https://www.fishwatch.gov/api/species`)
    content = await content.json()
    console.timeEnd("timer1");

    let chosen = Math.floor(Math.random() * content.length)
   
   
    content = {fact: content[chosen]['Physical Description'], image: content[chosen]['Image Gallery'][0].src}

    console.time("timer2");
   let img = await fetch(content.image)
   console.timeEnd("timer2");
   img = await img.buffer()
   console.log(content.fact.replaceAll(/<.+?>>/g, " "))
   res.render('Fish', {fact: content.fact.replaceAll('\n', "").replaceAll('<li>', "").replaceAll('</li>', "").replaceAll('<em>', "").replaceAll('</em>', "").replaceAll('<ul>', "").replaceAll('</ul>', "").replaceAll('&nbsp;', "").replaceAll('<span>', "").replaceAll('</span>', ""), buffer: img.toString('base64')})
})

