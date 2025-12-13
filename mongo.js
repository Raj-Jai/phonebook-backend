const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password (and other Arguements) as argument')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://jrbase:${password}@cluster0.flv3pyk.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url,{family:4})

const personSchema = new mongoose.Schema({
    name:String,
    number:String,
})

const Person = mongoose.model('Person',personSchema)

 if(process.argv.length===3)
{
    Person.find({}).then(result=>{
        result.forEach(person=>{
            console.log(`${person.name} :- ${person.number}`)
        })
        mongoose.connection.close()
    })
}

else{
const person = new Person({
    name:process.argv[3],
    number:process.argv[4],
})
    person.save().then(result =>{
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
    
}





// const note=new Note({
//     content:'React is easy',
//     important:false,
// })

// note.save().then(result =>{
//     console.log('note saved!')
//     console.log(note)
//     mongoose.connection.close()
// })

// Note.find({important:!true}).then(result =>{
//     result.forEach(note=>{
//         console.log(note.content)
//     })
//     mongoose.connection.close()
// })
