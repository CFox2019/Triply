import { checkIfValidDateFormat } from './dateValidator'
import { checkIfValidDestination } from './destinationValidator'

/**
 * Used to prevent the default click event behavior and handle validating and storing trip details.
 *
 * @param {*} event The click Event object
 */
export async function handleWhereToSubmit(event) {
    event.preventDefault()

    const destination = document.getElementById('destination')
    const destinationDatalist = document.getElementById(destination.getAttribute("list"));
    const selectedPlaceOption = destinationDatalist.options.namedItem(destination.value)
    let destinationValue, destinationLat, destinationLon
    // Attempt to get the `name`, `lat,` and `lon` attributes of the selected place option.
    // If present, set the `destinationValue`, `destinationLat`, and `destinationLon` values accordingly.
    try {
        destinationValue = selectedPlaceOption.getAttribute('name')
        destinationLat = selectedPlaceOption.getAttribute('lat')
        destinationLon = selectedPlaceOption.getAttribute('lon')
    } catch (error) {
        console.log('error', error)
    }

    // Reset the visual state of the destination field to remove an existing error states
    if (destination.classList.contains("form_input_error")) {
        destination.classList.remove("form_input_error")
        destination.classList.add("form_input")
    }

    const arrival = document.getElementById('arrival')
    const arrivalDate = arrival.value
    // Reset the visual state of the arrival field to remove an existing error states
    if (arrival.classList.contains("form_input_error")) {
        arrival.classList.add("form_input")
        arrival.classList.remove("form_input_error")
    }
    const departure = document.getElementById('departure')
    const departureDate = departure.value
    // Reset the visual state of the departure field to remove an existing error states
    if (departure.classList.contains("form_input_error")) {
        departure.classList.add("form_input")
        departure.classList.remove("form_input_error")
    }

    // Validate the destination
    let enteredInvalidDestination = false
    if (!checkIfValidDestination(destinationValue)) {
        destination.classList.remove("form_input")
        destination.classList.add("form_input_error")
        enteredInvalidDestination = true
    }

    // Validate the arrival date
    let enteredInvalidArrivalDate = false
    if (!checkIfValidDateFormat(arrivalDate)) {
        arrival.classList.remove("form_input")
        arrival.classList.add("form_input_error")
        enteredInvalidArrivalDate = true
    }

    // Validate the departure date
    let enteredInvalidDepartureDate = false
    if (!checkIfValidDateFormat(departureDate)) {
        departure.classList.remove("form_input")
        departure.classList.add("form_input_error")
        enteredInvalidDepartureDate = true
    }

    // If there are any errors, stop execution and show the user a helpful error message
    if (enteredInvalidDestination || enteredInvalidArrivalDate || enteredInvalidDepartureDate) {
        alert("You've entered an invalid destination and/or date. For destination, you must select a destination from the option list presented while typing. For dates, please use format MM/DD/YYYY.")
        return
    }

    const submit = document.getElementById('create_trip_submit')
    const submitText = submit.value
    submit.value = 'Loading...'
    submit.disabled = true

    // Call the server's `/create_trip` endpoit to store the validated trip details
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
            lat: destinationLat,
            lon: destinationLon,
            arrival: arrivalDate,
            departure: departureDate
        })
    })

    if (response.status === 201) {
        // If the request is successful, navigate to the `/trip_details` page
        window.location.pathname = '/trip_details'
    } else {
        // If the request is not successful, show the user an error message and reset the submit button state
        alert('An error occurred. Please try again.')
        submit.value = submitText
        submit.disabled = false
    }
}
