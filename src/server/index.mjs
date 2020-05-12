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

app.get('/trip_data', async function (req, res) {
    const destination = localStorage.getItem('destination')
    res.status(200).send({
        destination: destination,
        arrival: localStorage.getItem('arrival'),
        departure: localStorage.getItem('departure'),
        photo: await pixabayApi.searchPhoto(destination)
    })
})

app.post('/create_trip', function (req, res) {
    try {
        const { destination, arrival, departure } = req.body
        localStorage.setItem('destination', destination)
        localStorage.setItem('arrival', arrival)
        localStorage.setItem('departure', departure)
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
