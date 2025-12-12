const express = require('express')

const app = express()
app.use(express.json())
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    console.log("Sending response(get) for persons")
    res.json(persons)
})



app.get('/info',(req,res)=>{
    console.log("Sending response for info")
    const infoResponse=`Phonebook has info of ${persons.length} people <br> ${new Date().toUTCString()}(Eastern European Standarad Time)`
    res.send(infoResponse)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const person = persons.find(p=>p.id===id)

    if(person)
    {
        console.log(`Send response(get) for person id:${id}`)
        res.json(person)
    }
    else
    {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const id =req.params.id
    persons = persons.filter(p=>p.id!==id)
    console.log(`Sending response for Delete operation on person id${id}`)
    res.status(204).end()
})


const generateId = ()=>{
    const newID = Math.floor(Math.random()*1e5)
    return String(newID) 
}

app.post('/api/persons',(req,res)=>{
    const body = req.body
    const nameExist = (persons.map(p=> p.name.toLowerCase().trim())).includes(body.name.toLowerCase())
    if(body.name==='')
    {
       return res.status(400).json({
        error:"Name Missing"
       })
    }
    else if(body.number==='')
    {
        return res.status(400).json({
            error:"Number Missing"
        })
    }
    else if (nameExist)
    {
        return res.status(400).json({
            error:"Name must be unique"
        })
    }

     const person = {
        name:body.name,
        number:body.number,
        id:generateId()
     }

     persons = persons.concat(person)
    console.log( person)
    res.json(person)
})


const PORT = 3001
app.listen(PORT)

console.log(`Server running on PORT: ${PORT}`)
