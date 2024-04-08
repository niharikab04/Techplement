
const express=require ('express');
const app=express();
const {Server} = require('socket.io');

const mongoose = require('mongoose');
const User=require('./models/User');
const Chat=require('./models/Chat');
const bcrypt=require('bcrypt');

require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs=require('fs');
const maxAge = 3 * 24 * 60 * 60;



const server=require('http').createServer(app);//crct


app.use(express.static('public'));
app.use(cookieParser());

app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());

const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
        credentials:true, 
    },
    transports:['websocket','polling']
})


io.on('connection',(socket)=>{//making a connection


socket.on('initialChat',async()=>{
    try{
       const chatHistory = await Chat.find();
    socket.emit("initialChatHistory",chatHistory);
    }
    catch(error){
        console.log("failed to fetch initial chat history",error);
    }
});


 socket.on("sentMessage",async(payload)=>{//creating an event "chat" 
     const messageData = await Chat.create({Message:payload.message,author:payload.username});
     console.log(messageData);
    io.emit("receivedMessage",payload)//to whoever listening ,we will respond back 
 })

  })

function handleErrors(err) {
    console.log(err);
    let errors = { username: '', password: '' };
   
    if (err.message === 'Incorrect username') {
        errors.y=username = 'user not registered'
    }
    
    if (err.message === 'Incorrect password') {
        errors.password = 'incorrect password'
    }
    if (err.code === 11000) {
        console.log("hi")
        if (err.keyValue.username) {
            errors.username = "username already exists";
        }
        
        return errors;
    }
   

    if (err.message.includes('user validation failed')) {
        console.log(err.message)
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}




function createToken(id, username) {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

app.post ('/signup', async (req, res) => {
    const { username,  password } = req.body;
    try {

        const user = await User.create({ username,  password });
        const token = createToken(user._id, user.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user, token });
    }
    catch (err) {
        
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}
)
app.post ('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);

       
        const token = createToken(user._id, user.username);
        console.log("token",token)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(user);
        res.status(200).json({ user, token });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
})

app.post ('/logout' ,(req, res) => {

    res.cookie('jwt', '', { maxAge: 1 });//cookie name - emptying the token -expires cookie immediately (1)//If maxAge is not specified or set to null, the cookie becomes a session cookie, which expires when the browser is closed.
    res.redirect('/');

})



app.get('/profile', (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: 'Token not found' })
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' })
        }
        res.json(info);
    })

})

const dbURI = process.env.DB_URL;
mongoose.connect(dbURI)
  .then((result) => server.listen(5000))
  .catch((err) => console.log(err));



