import { app } from "./index.mjs"

const port = process.env.PORT
app.listen(port, function () {
    console.log(`Triply app listening on port ${port}!`)
})