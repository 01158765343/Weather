// Setup empty JS object to act as endpoint for all routes
projectData = {}
// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
const port=3000;
/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// function listen
app.listen(port , () => {
  console.log(`running server on localhost: ${port}`);
})
//Setup Server
// endpount to all any event by date
var a =new Date();
app.use((req,res , next) =>{
  console.log('time:',a);
  next ();
})

app.post('/postData', (req ,res) => {
    projectData ={
      temp:req.body.temp,
      fellimg:req.body.fell,
      city:req.body.city,
      time:req.body.time,
    }
  console.log(projectData)
    // console.log(req.body);
    // console.log('eldeeeeeeb'); test
})
app.get('/add',(req,res) => {
  res.send(projectData)
  console.log(projectData)
});