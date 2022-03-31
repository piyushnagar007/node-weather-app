const request = require('postman-request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicGl5dXNobmFnYXIiLCJhIjoiY2wwYXJ2c2QyMDFxaTNlb3ZrZGtiYWljMyJ9.hjpJp_fV4pLZZxK9rSTMPg&limit=1"
    
    request({url:url, json:true}, (error,response) => {
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(response.body.features.length === 0){
            callback('Could not find locaction',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })

}

module.exports=geocode