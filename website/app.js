/* Global Variables */
const btn = document.querySelector('#generate');
let api = "http://api.openweathermap.org/data/2.5/weather?zip=";
const kay = "0b99807685a7b4e580f3fd4dba6a7d3b";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = 1 + d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// function get wother data 
async function getdata(x){
    // let zipCod =document.getElementById('zip').value;
    if(!x){
        alert('bles writ zip code and felling');
        return
    }

    let fullUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${x}&appid=${kay}&units=metric`
    let a=await fetch(fullUrl);
    // Conversion  data to json
    let data = await a.json();
    // console.log(data); test
    return data 
    // postData('/addMovie',data.main);
}
// add event on click edet document
btn.addEventListener('click',function (){
  // get value zipcode and felling 
  let zipCod =document.getElementById('zip').value;
  let filing = document.querySelector('#feelings').value;
  // alert blz writ how feilling 
  if(!filing){
    alert('bles writ felling !!');
    return
  }
  // ren function get data
  getdata(zipCod)
  .then( (dat)=>{
    // ran function send data to server
    postData('/postData', {time:newDate,fell: filing , temp: dat.main.temp , city:dat.name });
  })
  .then( () => {
    // ran function updeat data from server
    updetElement('/add')
  })
  .catch( (error)=>{
    // when get errror handel error
    console.log(error);
  })
  })


const postData = async ( url ,data={} )=>{
        // console.log(data);
        const response = await fetch( url , {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
      const newData = await response;
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the erro
    }
}
// function to updeat data from server
const updetElement=async (url) =>{
  const data =await fetch (url)
  // convers data to json
  const datajsonn = await data.json()
  //get element and updat element data
  try {
    document.getElementById('temp').innerHTML=`temp is: ${datajsonn.temp}`;
    document.getElementById('date').innerHTML=`date is : ${datajsonn.time}`;
    document.getElementById('content').innerHTML=`feeling is: ${datajsonn.fellimg}`;
    document.getElementById('city').innerHTML=`city is: ${datajsonn.city}`;
  }catch(error) {
          console.log("error", error);
          // appropriately handle the error
   }
}