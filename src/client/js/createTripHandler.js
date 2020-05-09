import { checkIfValidDateFormat } from './dateValidator'

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const arrival = document.getElementById('arrival')
    const arrivalDate = arrival.value
    if (arrival.classList.contains("arrival_input_error")) {
        arrival.classList.add("arrival_input")
        arrival.classList.remove("arrival_input_error")
    }
    const departure = document.getElementById('departure')
    const departureDate = departure.value
    if (departure.classList.contains("departure_input_error")) {
        departure.classList.add("departure_input")
        departure.classList.remove("departure_input_error")
    }
    let enteredInvalidArrivalDate = false
    if (!checkIfValidDateFormat(arrivalDate)) {
        arrival.classList.remove("arrival_input")
        arrival.classList.add("arrival_input_error")
        enteredInvalidArrivalDate = true
    }
    let enteredInvalidDepartureDate = false
    if (!checkIfValidDateFormat(departureDate)) {
        departure.classList.remove("departure_input")
        departure.classList.add("departure_input_error")
        enteredInvalidDepartureDate = true
    }
    if (enteredInvalidArrivalDate || enteredInvalidDepartureDate) {
        alert("You've entered an invalid date. Please use format MM/DD/YYYY.")
        return
    }

    const submit = document.getElementById('create_trip_submit')
    submit.value = 'Loading...'
    submit.disabled = true
    // TODO: update to use new form
    // const results = document.getElementById('results')
    // results.innerHTML = ""

    // console.log("::: Form Submitted :::")
    // const response = await fetch('/fetchSentiment', {
    //     method: 'post',
    //     mode: 'cors',
    //     credentials: 'same-origin',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         url: formText
    //     })
    // })
    // const json = await response.json()
    // results.innerHTML = json.sentiment
    // submit.value = 'Submit'
    // submit.disabled = false
}

document.getElementById("create_trip_submit").addEventListener("click", handleSubmit)
