const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { ipcMain } = require('electron')
const request = require('request')
const session = require('express-session')
const db = require('./database.js')
const sha256 = require('sha256')

console.log(sha256('L1teSer1992'))

const ipc = ipcMain
const app = new express()

const PORT = 3000

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
    user_data: {
        id: "No ID"
    }
}))

app.get('/admin', (req, res) => {
    db.query('SELECT * FROM products', (err, result, fields) => {
        if (err) throw err;
        let userid = 0
        if (typeof req.session.user_data == 'undefined') {
            console.log("AOAOAAO")
        } else {
            userid = req.session.user_data.id
        }
        db.query('SELECT * FROM orders WHERE userid = ? AND paid = 0', [userid], (err, result2, fields) => {
            if (err) throw err;
            db.query('SELECT * FROM orders WHERE paid = 1', [userid], (err, result3, fields) => {
                if (err) throw err;
                res.render('admin', {result: result, cart: result2, paid: result3, session: req.session})
            })
        })
    })
})


// Main page
app.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, result, fields) => {
        if (err) throw err;
        let userid = 0
        if (typeof req.session.user_data == 'undefined') {
            console.log("AOAOAAO")
        } else {
            userid = req.session.user_data.id
        }
        db.query('SELECT * FROM orders WHERE userid = ? AND paid = 0', [userid], (err, result2, fields) => {
            if (err) throw err;
            db.query('SELECT * FROM orders WHERE userid = ? AND paid = 1', [userid], (err, result3, fields) => {
                if (err) throw err;
                res.render('index', {result: result, cart: result2, paid: result3, session: req.session})
            })
        })
    })
})

app.get('/card/:id', (req, res) => {
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, result, fields) => {
        if (err) throw err;
        console.log(req.params.id, result)
        res.render('card', {result: result[0], session: req.session})
    })
})

app.get('/buy/:id', (req, res) => {
    db.query('INSERT INTO orders (productid, userid, orderid) VALUES (?, ?, ?)', [req.params.id, req.session.user_data.id, (100000 + Math.random() * 900000)], (err, result, fields) => {
        if (err) throw err;
        console.log(req.params.id, result)
        res.redirect('/')
    })
})

app.get('/payPage', (req, res) => {
    res.render('payment', {session: req.session})
})

app.post('/pay', (req, res) => {
    db.query('UPDATE orders SET paid = 1 WHERE userid = ?', [req.session.user_data.id], (err, result, fields) => {
        if (err) throw err;
        res.redirect('/')
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})


app.get('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

app.post('/sendLogin', urlencodedParser, (req, res) => {
    let username = req.body.login
    let password = sha256(req.body.password)
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result)
            req.session.user_data = result[0]
            res.redirect('/')
        } else {
            res.render('login')
        }
        
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
