const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('unable to find the address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lat;;
  var weatherUrl = `https://api.forecast.io/forecast/9bf1be703e30aea624810f612d7d7829/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
   var temperature = response.data.currently.temperature;
   var apparentTemperature = response.data.currently.apparentTemperature;
   console.log(`Its currently ${temperature} and it feels like ${apparentTemperature}`)
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
 console.log('unable to connect to API servers');
} else{
  console.log(e.message);
}
});


