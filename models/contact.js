const mongoose= require('mongoose');    //we will require for so we can create mongoose model

const contactSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
        //We can also add validation like phone number should be of 10 digits
    },
    email:{
        type:String,
        required:true
    }
});

//now we have defined a variable where we will store this schema
const Contact = mongoose.model('Contact',contactSchema);

//now we can use this schema anywhere in the app with using this Contact app
module.exports= Contact;