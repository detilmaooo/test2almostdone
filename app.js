let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')
let PORT = 3000
let app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'secretkey123',
    resave: false,
    saveUninitialized: false
}))


app.get('/signup', (req,res) => {
    res.render('signup')
})

app.post('/signup', (req, res)=>{
    
    var {username} = req.body
    var {password} = req.body
    var {email} = req.body
    if(username && password && email){
        req.session.username = username
        req.session.password = password
        req.session.email = email
        res.redirect('welcome') // as redirect spo bon
    } else {
        res.render('signup')
    }
})


app.get('/login', (req, res)=>{
    res.render('login')
})
app.post('/login', (req, res)=>{
    
    var {username} = req.body
    var {password} = req.body
    if (
        username == req.session.username &&
        password == req.session.password
    ){
        res.redirect('/welcome')
    } else {
        res.render('login')
    }
})

app.get("/welcome", (req, res)=>{
    
    if(req.session.username){
        res.render('welcome', {username: req.session.username, password: req.session.password})
    } else {
        res.redirect('signup')
    }

})

app.listen(PORT)

