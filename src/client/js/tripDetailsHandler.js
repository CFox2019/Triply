import moment from 'moment'

/**
 * Used to fetch the stored trip details from the server's `trip_data` endpoint
 * and update the UI with the retreived trip data.
 */
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
    const { destination, arrival, departure, photo, weather } = json
    console.log("photo", photo)
    document.getElementById('destination_place').innerHTML = destination
    document.getElementById('destination_wrapper').style.backgroundImage = `url(${photo})`
    document.getElementById('arrival_date').innerHTML = arrival
    document.getElementById('departure_date').innerHTML = departure

    const tripDatesContainer = document.getElementById('trip_days_container')
    for (const date of getDates(arrival, departure)) {
        let dateCell = document.createElement('div')
        dateCell.classList.add('trip_day_cell')

        let dateH3 = document.createElement('h3')
        dateH3.innerHTML = `${date.getMonth() + 1}/${date.getDate()}`
        dateCell.appendChild(dateH3)

        for (const weatherData of weather) {
            const weatherDate = new Date(weatherData.validDate)
            weatherDate.setHours(0,0,0,0)
            if (weatherDate.getTime() === date.getTime()) {
                let weatherDiv = document.createElement('div')
                weatherDiv.classList.add('weather_temp')
                weatherDiv.innerHTML = `${weatherData.lowTemp}°-${weatherData.highTemp}°`
                dateCell.appendChild(weatherDiv)
            }
        }

        tripDatesContainer.appendChild(dateCell)
    }
}

/**
 * Used to get all dates between the `startDate` and `endDate`.
 *
 * @param {string} startDate The start date string
 * @param {string} endDate The end date string
 */
function getDates(startDate, endDate) {
    let dates = []

    const beginDate = moment(startDate).subtract(1, 'days').startOf('day')
    const lastDate = moment(endDate).add(1, 'days').startOf('day')

    while(beginDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(beginDate.clone().toDate())
    }

    return dates
}
