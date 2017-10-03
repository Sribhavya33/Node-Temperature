const request = require('request');

var getWeather = (lat, lng, callback) =>{
  // var encodeAddress = encodeURIComponent(lat, lng);

request({
    url: `https://api.forecast.io/forecast/9bf1be703e30aea624810f612d7d7829/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
  	if(error){
  		callback('unable to connect forecast.io server');
 } else if (response.statusCode === 400)
  	{
  		callback('unable to fetch weather');
  	}   else if(response.statusCode === 200){
  		
      callback(undefined, {
        temperature: body.currently.temperature,
  	   apparentTemperature: body.currently.apparentTemperature
    });
    }
});
};
module.exports.getWeather = getWeather;