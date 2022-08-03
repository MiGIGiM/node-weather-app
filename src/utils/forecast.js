const request = require('request');


const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0abde6affee7b77a0e106db1a8b24146&query='+ lat + ',' + long;

  request({
    url: url,
    json: true,
  }, (error, response) => {
    if (error) callback('Something went wrong, try again later', undefined);
    if (response.body.status) callback('Location not found', undefined);
    else {
      const { weather_descriptions, temperature } = response.body.current;
      callback(undefined, `It's ${weather_descriptions[0]}. Currently ${temperature} degrees out.`);
    };
  } )
}

module.exports = forecast;