import fetch from 'node-fetch'

/**
 * Used to setup the input event listener on the destination input field
 * and handle fetching and displaying the places suggestions from the `/autocfomplete` endpoint.
 */
export function registerDestinationAutocomplete() {
    const destinationOptions = document.getElementById('destination_options')
    async function autocomplete(event) {
        const response = await fetch('/autocomplete', {
            method: 'post',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                text: event.target.value
            })
        })
        const json = await response.json()
        const { places } = json
        console.log('places', places)
        const htmlOptions = places.map((place) => {
            let adminCode = place.adminCode1
            adminCode = (isNaN(parseInt(adminCode))) ? adminCode : place.countryCode
            adminCode = adminCode ? `, ${adminCode}` : ''
            const toponymName = place.toponymName
            let placeName
            if (toponymName && toponymName.length > 0) {
                placeName = `${toponymName}${adminCode}`
            } else {
                placeName = `${place.name}${adminCode}`
            }
            return `<option name="${placeName}" lat=${place.lat} lon=${place.lng}>${placeName}</option>`
        })
        destinationOptions.innerHTML = htmlOptions
    }
    document.getElementById('destination').addEventListener('input', autocomplete)
}
