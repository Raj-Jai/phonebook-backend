const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)

mongoose.connect(url,{family:4}).then(result=>{
    console.log("Connected to MongoDB")
}).catch(error=>{
    console.log('error connecting to MongoDB:',error.message)
})

const personSchema = new mongoose.Schema({
    name:String,
    number:String,
})
personSchema.set('toJSON',{
    transform:(document,returedObject)=>{
        returedObject.id = returedObject._id.toString()
        delete returedObject.__v
        delete returedObject._id
    }
})


module.exports = mongoose.model('Person',personSchema)
