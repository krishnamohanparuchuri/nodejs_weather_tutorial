const express = require('express')
const path = require('path')
const hbs = require('hbs')
const foreCast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express();

//define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
//middleware functions
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Krishna Paruchuri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Krishna Mohan paruchuri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help and Support',
        name: 'Krishna Mohan Paruchuri'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                place,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send([{
        location: 'Stockholm',
        temperature: 27
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        description: 'Try a different article',
        name: 'krishna mohan paruchuri'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        name: 'krishna mohan paruchuri',
        description: 'Go back to home page'
    })
})

app.listen(3500, () => {
    console.log('server is running on port 3500..')
})