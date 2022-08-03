const request = require('request')

const geoCode = (address, callback) => {

  const url = `http://api.positionstack.com/v1/forward?access_key=b7d56e986e00d037207610d0952c296f&query=${address}`;

  request({ url: url, json: true }, (err, res) => {
    if (res.statusCode !== 200 || err) callback('Something went wrong. Try again later.', undefined);
    if (res.body.data.length === 0) callback('No location found', undefined);
    else callback(undefined, { lat: res.body.data[0].latitude, long: res.body.data[0].longitude, location: res.body.data[0].label })
  })
}

module.exports = geoCode