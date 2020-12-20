const request = require('request');
const constants = require('../config');

const   weatherData = (address,callback)=>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
   
    request({url,json:true},(error,{body})=>{
        
        if(error){
            callback("can't fetch data from open api",undefined);
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("Unable to find required data, try another location.",undefined);
        }
        else{
            callback(undefined,{
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;