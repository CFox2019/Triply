export async function getTripDetails() {
    const response = await fetch('/trip_data', {
        method: 'get',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const json = await response.json()
    const { destination, arrival, departure, photo } = json
    console.log("photo", photo)
    document.getElementById('destination').innerHTML = destination
    document.getElementById('destination_wrapper').style.backgroundImage = `url(${photo})`
    document.getElementById('arrival_date').innerHTML = arrival
    document.getElementById('departure_date').innerHTML = departure
}
