function checkIfValidUrl(url) {
    console.log("::: Running checkIfValidUrl :::", url);
    return /https|http|www|.org|.com|.net/.test(url)
}

export { checkIfValidUrl }
