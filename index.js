const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 5600
const fs = require('fs')

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

app.get('/Bird', async (req, res) => {
    let content = await fetch(`https://some-random-api.ml/animal/birb`)
    content = await content.json()
    let img = await fetch(content.image)
    img = await img.buffer()
    res.render('Bird', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Panda', async (req, res) => {
    let content = await fetch(`https://some-random-api.ml/animal/panda`)
    content = await content.json()
    let img = await fetch(content.image)
    img = await img.buffer()
    res.render('Panda', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Fox', async (req, res) => {
    let content = await fetch(`https://some-random-api.ml/animal/fox`)
    content = await content.json()
    let img = await fetch(content.image)
    img = await img.buffer()
    res.render('Fox', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Koala', async (req, res) => {
    let content = await fetch(`https://some-random-api.ml/animal/koala`)
    content = await content.json()
    let img = await fetch(content.image)
    img = await img.buffer()
    res.render('Koala', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Racoon', async (req, res) => {
    let content = await fetch(`https://some-random-api.ml/animal/racoon`)
    content = await content.json()
    let img = await fetch(content.image)
    img = await img.buffer()
    res.render('Racoon', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Whale', async (req, res) => {
    
    let content = await fetch(`https://some-random-api.ml/facts/whale`)
    content = await content.json()
    
    console.time('uwu')
    let img = await fetch(`https://some-random-api.ml/img/whale`)
    img = await img.json()
    img = await fetch(img.link)
    img = await img.buffer()
    console.timeEnd('uwu')
    res.render('Whale', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Kangaroo', async (req, res) => {
    
    let content = await fetch(`https://some-random-api.ml/facts/kangaroo`)
    content = await content.json()
    
    console.time('uwu')
    let img = await fetch(`https://some-random-api.ml/img/kangaroo`)
    img = await img.json()
    img = await fetch(img.link)
    img = await img.buffer()
    console.timeEnd('uwu')
    res.render('Kangaroo', {fact: content.fact, buffer:img.toString('base64')})
})

app.get('/Elephant', async (req, res) => {
  
   let fact = require('./Elephant_facts.json')
 let content = {fact: fact[Math.floor(Math.random() * fact.length)]} 
    let details = require('./Elephant_details.json')
 
    fs.readFile('./assets/Elephant.png', (err, data) => {
        res.render('Elephant', {fact: content.fact, buffer: data.toString('base64')})
    })
})

app.get('/Cow', async (req, res) => {
    let fact = require('./cow_facts.json')
    let content = {fact: fact[Math.floor(Math.random() * fact.length)]} 
    fs.readFile('./assets/Cow.jpg', (err, data) => {
        res.render('Cow', {fact: content.fact, buffer: data.toString('base64')})
    })
})

app.get('/wallpaper.png', async (req, res) => {
    res.sendFile(__dirname+'/walpaper.png')
})

app.get('/assets/:file', async (req, res) => {
    res.sendFile(__dirname+`/assets/${req.params.file}`)
})


