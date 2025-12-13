require('dotenv').config()
const Person = require('./models/persons')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()


app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
// const morganFun = (tokens,req,res)=>{
//     return [
//         tokens.method(req,res),
//         tokens.url(req,res),
//         tokens.status(req,res),
//         tokens.res(req,res,'content-length'),'-','ms',
//         tokens.body(req,res) ,

//     ].join(" ")
// }
app.use(morgan(':method :url :status :response-time ms- :body'))


app.get('/api/persons', (req, res) => {

    Person.find({}).then(persons => {
        res.json(persons)
        console.log("Sending response(get) for persons", persons)
    })

})



app.get('/info', (req, res) => {
    console.log("Sending response for info")
    const infoResponse = `Phonebook has info of ${persons.length} people <br> ${new Date().toUTCString()}(Eastern European Standarad Time)`
    res.send(infoResponse)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(result=>{
        res.json(note)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const removedPerson = persons.filter(p => p.id === id)[0]
    persons = persons.filter(p => p.id !== id)
    console.log(`Sending response for Delete operation on person id${id}`)
    res.status(204).end()
})


const generateId = () => {
    const newID = Math.floor(Math.random() * 1e5)
    return String(newID)
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    // const nameExist = (persons.map(p => p.name.toLowerCase().trim())).includes(body.name.toLowerCase())
    if (body.name === '') {
        return res.status(400).json({
            error: "Name Missing"
        })
    }
    else if (body.number === '') {
        return res.status(400).json({
            error: "Number Missing"
        })
    }
    // else if (nameExist) {
    //     return res.status(400).json({
    //         error: "Name must be unique"
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
        
    })

    person.save().then(result=>{
        res.json(result)
    })
})


const PORT = process.env.PORT
app.listen(PORT)

console.log(`Server running on PORT: ${PORT}`)
