const express = require('express')
const path = require('path')
const aylien = require('aylien_textapi')
const dotenv = require('dotenv')
const LocalStorage = require('node-localstorage').LocalStorage
const localstorage = new LocalStorage('./triply_data')
dotenv.config()

const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: path.join(__dirname, '../../dist') })
})

app.get('/my_trips', function (req, res) {
    res.sendFile('my_trips.html', { root: path.join(__dirname, '../../dist') })
})

app.get('/trip_details', function (req, res) {
    res.sendFile('trip_details.html', { root: path.join(__dirname, '../../dist') })
})

app.post('/create_trip', function (req, res) {
    try {
        const { destination, arrival, departure } = req.body
        localstorage.setItem('destination', destination)
        localstorage.setItem('arrival', arrival)
        localstorage.setItem('departure', departure)
        if (localstorage.getItem('destination')) {
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
