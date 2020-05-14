'use strict'
import fetch from 'node-fetch'

export class WeatherbitApi {

    constructor(api_key) {
        this.api_key = api_key
    }

    async getForecast(lat, lon) {
        const uri = encodeURI(`https://api.weatherbit.io/v2.0/forecast/daily?key=${this.api_key}&lat=${lat}&lon=${lon}&units=I`)
        console.log('uri', uri)
        const response = await fetch(uri, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        const { data } = json
        if (!data || data.length == 0) {
            return null
        }
        const mappedData = data.map((weatherData) => {
            const { valid_date, low_temp, high_temp, precip, weather: { icon } } = weatherData
            return {
                validDate: valid_date,
                lowTemp: Math.round(low_temp),
                highTemp: Math.round(high_temp),
                precip: precip,
                icon: icon
            }
        })
        return mappedData
    }
}