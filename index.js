const express=require('express');
const path=require('path'); 
const port=8000;

const db= require('./Config/mongoose');
const Contact= require('./models/contact');

const app=express();

app.set('view engine','ejs');   
app.set('views',path.join(__dirname,'views'));      //it will join my current directory with folder name specified
app.use(express.urlencoded());                                 //Middleware
app.use(express.static('assets'));  //Look for a static file to load which is in folder named assets

// //middleware1
// app.use(function(req,res,next){
//     req.myName="Yogesh";
//     console.log('middleware1 called');
//     next();
// });
//                         //these middleware are called twice one for post and other for home page
// //middlware2
// app.use(function(req,res,next){
//     console.log('my name from mw2',req.myName);
//     console.log('middleware2 called');
//     next();                                 //it takes me to app.get() function
// });


app.get('/',function(req,res){              //This is telling me about the home page
    //console.log(__dirname);           For printing the name of directory 
    //console.log('my name from req',req.myName);
    Contact.find({},function(err,contactList){ //here will find the contact in database and if found then store it in the variable named "contactList"
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title: "Contacts List",
            contact_list: contactList
        });
    });
    // return res.render('home',{title:"I am Flying"});
    //res.send('Cool, it is running!')
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let us play more with ejs!"
    });
});

app.get('/delete-contact/',function(req,res){
    console.log(req.params);
    //get the query from the url (Without using database)
    // let phone=req.query.phone;
    // let contactIndex= contactList.findIndex(contact => contact.phone == phone);
    // if (contactIndex !=-1){
    //     contactList.splice(contactIndex,1);
    // }

    //get the id from query in url(Using with database)
    let id=req.query.id;
    
    //Find the contact by id and delete it
    Contact.findByIdAndDelete(id,function(err,){
        if(err){
            console.log('can not delete');
            return;
        }
        return res.redirect('back');
    });
})

app.post('/create-account',function(req,res){
    console.log(req.body);
    //contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
        email:req.body.email
    },function(err, newContact){
        if(err){
            console.log('error in creating contact!');
            return;
        }
        console.log('****',newContact);
        return res.redirect('back');
    });
});

app.listen(port,function(error){
    if(error){
        console.log('Error is running',error);
    }
    console.log('Yup! My Express Server is running on port....:',port);
});

// NOTE:IN EXPRESS.JS THERE IS NO NEED TO DEFINE OTHER THING FOR ERROR IF I VISIT OTHER PAGE/URL THEN IT WILL
// AUTOMATICALLY GIVE ERROR.
