// api.geonames.org/postalCodeSearchJSON?postalcode=9011&maxRows=10&username=udacity_courtney

'use strict'
import fetch from 'node-fetch'

export class GeonamesApi {

    constructor(api_key) {
        this.api_key = api_key
    }

    async searchJSON(query) {
        const uri = encodeURI(`http://api.geonames.org/searchJSON?username=${this.api_key}&q=${query}&maxRows=8`)
        console.log('uri', uri)
        const response = await fetch(uri, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        const { geonames } = json
        if (!geonames || geonames.length == 0) {
            return ['Uknown location']
        }
        return geonames
    }
}