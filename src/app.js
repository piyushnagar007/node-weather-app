const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Piyush Nagar'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About Me',
        name:'Piyush Nagar'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'help',
        name:'Piyush Nagar'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        res.send({
            error:'Invalid address searched'
        })
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
            if(error){
                res.send({ error })
            }
            forecast(latitude, longitude, (error, weatherdata) => {
                res.send({
                    location,
                    forecast:weatherdata,
                    address:req.query.address
                })
              })
        })
    }
    
})

app.get('/help/*',(req, res) => {
    res.render('notFound',{
        title:'404',
        name:'Piyush Nagar',
        errorMessage:'Help article not found!'
    })
})

app.get('*',(req, res) => {
    res.render('notFound',{
        title:'404',
        name:'Piyush Nagar',
        errorMessage:'Page not found!'
    })
})

app.listen(3000,() => {
    console.log("App is started on port 3000");
})