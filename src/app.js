const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utilis/geocoding')
const forecast=require('./utilis/forecast')



const app=express()
//getting path of directory
const publicpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const paritalspath=path.join(__dirname,'../templates/partials')

//setting views engine and path for views 

app.set('views',viewspath)
app.set('view engine', 'hbs')
//hbs partials setting
hbs.registerPartials(paritalspath)

//using directory contains static page
app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'muthu',
        job:'developer',
        title:'Home Page'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'help page',
        phone:'91- 8220170749',
        title:'Help page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        name:'focus'
    })
})
app.get('/weather',(req,res)=>{
    res.render('weather',{
        title:'Weather'
    })

    
})
app.get('/weather2',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please enter the location address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
     
    //console.log(req.query.address)
    //res.send({
      //  address:req.query.address,
        //weather:'its chill now!'
    //})
    
    
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'please enter the search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
    

})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'help article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error page 404 page not found'
    })
})

app.listen(3000,()=>{
    console.log('server strat')
})