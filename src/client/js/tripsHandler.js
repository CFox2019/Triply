export async function getTrips() {
    const response = await fetch('/my_trips_data', {
        method: 'get',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const json = await response.json()
    const { trips } = json
    if (!trips || trips.length === 0) {
        return
    }
    for (const trip of trips) {
        const { destination, arrival, departure } = trip
        const tripLink = document.createElement('a')
        const text = `${destination.length > 10 ? destination.slice(0, 10) + '...' : destination} (${arrival}–${departure})`
        const linkText = document.createTextNode(text)
        tripLink.title = text
        tripLink.href = '/trip_details'
        tripLink.appendChild(linkText)
        const tripsList = document.getElementById('trips_list')
        tripsList.appendChild(tripLink)
    }
}