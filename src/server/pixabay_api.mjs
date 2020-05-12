'use strict'
import fetch from 'node-fetch'

export class PixabayApi {

    constructor(api_key) {
        this.api_key = api_key
    }

    async searchPhoto(query) {
        const uri = encodeURI(`https://pixabay.com/api/?key=${this.api_key}&q=${query}&image_type=photo`)
        console.log('uri', uri)
        const response = await fetch(uri, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        const { hits } = json
        if (!hits || hits.length == 0) {
            return null
        }
        const { largeImageURL } = hits[0]
        return largeImageURL
    }
}