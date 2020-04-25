import { checkIfValidUrl } from './urlValidator'

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value
    if (!checkIfValidUrl(formText)) {
        alert("You've entered an invalid URL")
        return
    }

    const submit = document.getElementById('submit')
    submit.value = 'Loading...'
    submit.disabled = true
    const results = document.getElementById('results')
    results.innerHTML = ""

    console.log("::: Form Submitted :::")
    const response = await fetch('/fetchSentiment', {
        method: 'post',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            url: formText
        })
    })
    const json = await response.json()
    results.innerHTML = json.sentiment
    submit.value = 'Submit'
    submit.disabled = false
}

export { handleSubmit }
