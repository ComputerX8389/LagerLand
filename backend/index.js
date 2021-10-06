const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    console.log('Hello World!')
    res.send('Lagerland api')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})