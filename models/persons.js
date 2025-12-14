const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery',false)

mongoose.connect(url,{family:4}).then(result=>{
    console.log("Connected to MongoDB")
}).catch(error=>{
    console.log('error connecting to MongoDB:',error.message)
})

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:true,
    },
    number:{
        type:String,
        validate:[(value)=>{
            const dashCount = value.split("-").length-1
            console.log(dashCount)
            if(dashCount!==1) return false
            const firstPartLength = value.indexOf("-")
            if(firstPartLength===2 || firstPartLength===3) return true
            return false
        },"Incorrect Number format"],
        minLength:8,
        required:true,
    }
})
personSchema.set('toJSON',{
    transform:(document,returedObject)=>{
        returedObject.id = returedObject._id.toString()
        delete returedObject.__v
        delete returedObject._id
    }
})


module.exports = mongoose.model('Person',personSchema)
