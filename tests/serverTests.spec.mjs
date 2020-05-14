import { app } from '../src/server/index.mjs'
const supertest = require('supertest')
console.log('SuperTest', supertest);

const request = supertest(app)

describe('/autocomplete', () => {
    it('to return autocomplete places', async done => {
        request.post('/autocomplete')
        .send({text: 'Disney'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err)
            expect(res.body.places.length).toBeGreaterThan(0)
            done()
        });
    })
})

describe('/create_trip', () => {
    it('should create trip and return 201', async done => {
        request.post('/create_trip')
        .send({
            destination: 'Disney World',
            arrival: '05/14/2020',
            departure: '05/23/2020',
            lat: 12.34,
            lon: -80.11
        })
        .expect(201, done)
    })
})

describe('/trip_data', () => {
    it('should return trip data JSON', async done => {
        request.get('/trip_data')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err)
            const { body: { destination, arrival, departure, lat, lon, photo, weather } } = res
            expect(destination).not.toBeNull()
            expect(arrival).not.toBeNull()
            expect(departure).not.toBeNull()
            expect(lat).not.toBeNull()
            expect(lon).not.toBeNull()
            expect(photo).not.toBeNull()
            expect(weather).not.toBeNull()
            done()
        })
    })
})