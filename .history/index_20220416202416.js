const express = require('express')
const app = express()
const port = process.env.PORT || 5600

app.set('view engine', 'ejs')
app.listen(port, () => {
    console.log(`Listening to ${port}`)
})

app.get('/', async (req, res) => {
    return res.render('index')
})

app.get('/wallpaper', async (req, res) => {
    return res.sendFile(__dirname+'/walpaper.png')
})