const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const MongoStore = require('connect-mongo')(session);

const  app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));




const connection = mongoose.createConnection('mongodb://localhost:27017/tutorial_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})



app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{
        maxAge: 1000*60*60*24
    }
}))

app.get('/', (req, res, next) =>{
    res.send('<h1>Hello World</h1>')
})

app.listen(3000);