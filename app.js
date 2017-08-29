const Hs100Api = require("./hs-110-api")
const express = require('express')
const app = express()
app.use(express.static('public'))


// Plug

const client = new Hs100Api.Client()
const plug = client.getPlug({host: "192.168.1.131"})
console.log("plug: ", plug)

// Express

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.get('/on', (req, res) => wrap(res, setLights(true)))
app.get('/off', (req, res) => wrap(res, setLights(false)))
app.get('/toggle', (req, res) => wrap(res, toggle()))
app.get('/disco', (req, res) => wrap(res, disco()))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

const wrap = (res, promise) => promise.then(() => res.end("success")).catch(err => res.send("error: " + err))

const toggle = () => plug.getPowerState().then(state => setLights(!state))
const disco = () => new Promise((resolve, reject) => {
 const id = setInterval(toggle, 750)
 setTimeout(() => {
  clearInterval(id)
  resolve()
 }, 10000)
})

const setLights = state => {
 console.log("Setting lights to " + state)
 return plug.setPowerState(state)
}


