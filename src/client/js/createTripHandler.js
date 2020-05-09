import { checkIfValidDateFormat } from './dateValidator'
import { checkIfValidDestination } from './destinationValidator'

export async function handleWhereToSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const destination = document.getElementById('destination')
    const destinationValue = destination.value
    if (destination.classList.contains("form_input_error")) {
        destination.classList.remove("form_input_error")
        destination.classList.add("form_input")
    }
    const arrival = document.getElementById('arrival')
    const arrivalDate = arrival.value
    if (arrival.classList.contains("form_input_error")) {
        arrival.classList.add("form_input")
        arrival.classList.remove("form_input_error")
    }
    const departure = document.getElementById('departure')
    const departureDate = departure.value
    if (departure.classList.contains("form_input_error")) {
        departure.classList.add("form_input")
        departure.classList.remove("form_input_error")
    }

    let enteredInvalidDestination = false
    if (!checkIfValidDestination(destinationValue)) {
        destination.classList.remove("form_input")
        destination.classList.add("form_input_error")
        enteredInvalidDestination = true
    }
    let enteredInvalidArrivalDate = false
    if (!checkIfValidDateFormat(arrivalDate)) {
        arrival.classList.remove("form_input")
        arrival.classList.add("form_input_error")
        enteredInvalidArrivalDate = true
    }
    let enteredInvalidDepartureDate = false
    if (!checkIfValidDateFormat(departureDate)) {
        departure.classList.remove("form_input")
        departure.classList.add("form_input_error")
        enteredInvalidDepartureDate = true
    }
    if (enteredInvalidDestination || enteredInvalidArrivalDate || enteredInvalidDepartureDate) {
        alert("You've entered an invalid destination and/or date. For dates, please use format MM/DD/YYYY.")
        return
    }

    const submit = document.getElementById('create_trip_submit')
    const submitText = submit.value
    submit.value = 'Loading...'
    submit.disabled = true

    console.log("::: Form Submitted :::")
    const response = await fetch('/create_trip', {
        method: 'post',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            destination: destinationValue,
            arrival: arrivalDate,
            departure: departureDate
        })
    })
    if (response.status === 201) {
        window.location.pathname = '/trip_details'
    } else {
        alert('An error occurred. Please try again.')
        submit.value = submitText
        submit.disabled = false
    }
}
