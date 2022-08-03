const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Miguel Rodriguez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Miguel Rodriguez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text',
        title: 'Help',
        name: 'Miguel Rodriguez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.status(400).send({
                error,
            });
        }

        if (data) {
            forecast(data.lat, data.long, (error, forecastData) => {
                if (forecastData) {
                    return res.status(200).send({
                        forecast: forecastData,
                        location: data.location
                    })
                };
            });

        }
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miguel Rodriguez',
        errorMessage: 'Help text'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miguel Rodriguez',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})