const express = require('express')
const bodyParse = require('body-parser')

const app = express()

app.use(express.static('.'))
app.use(bodyParse.urlencoded({ extended: true}))
app.use(bodyParse.json())

app.get('/teste', (req, res) => {
    res.send("<h1>Tudo funcionando ok!!</h1>")
})
app.listen(8080, () => {
    console.log("Sevidor sendo executado na porta 8080")
})