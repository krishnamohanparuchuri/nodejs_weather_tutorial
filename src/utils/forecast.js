const request = require('request')

const foreCast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6863af5e398e95522a91ad16214795c9&query=' +
        lat + ',' + long + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to server', undefined)
        } else if (body.error) {
            callback('Unable to load temperature.Wrong input', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +
                '. It is currently ' + body.current.temperature +
                ' degress out. It feels like ' + body.current.feelslike +
                ' degress out..')
        }
    })
}
module.exports = foreCast;