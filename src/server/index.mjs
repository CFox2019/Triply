import express from 'express'
import path from 'path'
const __dirname = path.resolve()
const root = path.join(__dirname, 'dist')
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import LocalStorage from 'node-localstorage'
const localStorage = new LocalStorage.LocalStorage('./triply_data')
import { PixabayApi } from './pixabay_api.mjs'
const pixabayApi = new PixabayApi(process.env.PIXABAY_API_KEY)
import { GeonamesApi } from './geonames_api.mjs'
const geonamesApi = new GeonamesApi(process.env.GEONAMES_API_KEY)
import { WeatherbitApi } from './weatherbit_api.mjs'
const weatherbitApi = new WeatherbitApi(process.env.WEATHERBIT_API_KEY)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: root })
})

app.get('/my_trips', function (req, res) {
    res.sendFile('my_trips.html', { root: root })
})

app.get('/trip_details', function (req, res) {
    res.sendFile('trip_details.html', { root: root })
})

app.post('/autocomplete', async function (req, res) {
    const { body: { text } } = req
    console.log('text', text)
    const places = await geonamesApi.searchJSON(text)
    res.status(200).send({places: places})
})

app.get('/my_trips_data', function (req, res) {
    res.status(200).send({
        trips: [{
            destination: localStorage.getItem('destination'),
            arrival: localStorage.getItem('arrival'),
            departure: localStorage.getItem('departure')
        }]
    })
})

app.get('/trip_data', async function (req, res) {
    const destination = localStorage.getItem('destination')
    const lat = localStorage.getItem('lat')
    const lon = localStorage.getItem('lon')
    const weather = await weatherbitApi.getForecast(lat, lon)
    res.status(200).send({
        destination: destination,
        arrival: localStorage.getItem('arrival'),
        departure: localStorage.getItem('departure'),
        lat: lat,
        lon: lon,
        photo: await pixabayApi.searchPhoto(destination.split(',')[0]) || await pixabayApi.searchPhoto('travel'),
        weather: weather
    })
})

app.post('/create_trip', async function (req, res) {
    try {
        const { destination, arrival, departure, lat, lon } = req.body
        localStorage.setItem('destination', destination)
        localStorage.setItem('arrival', arrival)
        localStorage.setItem('departure', departure)
        localStorage.setItem('lat', lat)
        localStorage.setItem('lon', lon)
        if (localStorage.getItem('destination')) {
            res.sendStatus(201)
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        console.log(`post::create_trip error: ${error}`)
        res.sendStatus(500)
    }
})

const port = process.env.PORT
app.listen(port, function () {
    console.log(`Triply app listening on port ${port}!`)
})
