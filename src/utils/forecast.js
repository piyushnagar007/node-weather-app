const request = require('postman-request')
const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0116d9b450203db56168acd85f262082"
    const finalUrl = (url + "&query=" + longitude + "," + latitude)
    console.log("weather url" + finalUrl)
    request({url:finalUrl,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback('Could not find locaction',undefined)
        }else{
            callback(undefined,body.location.name + " " + body.current.weather_descriptions[0]  + " It is currently "+body.current.temperature+" degrees out. Chances of rain are "+ body.current.precip+"%. Humidity is " + body.current.humidity);
        }
    }) 
}

module.exports = forecast