const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVjaHN0YWNrIiwiYSI6ImNrY3BjdndjcjA1MzUzMG1nYnB2MHY1NDkifQ.exXN36gpBxtV0pF2zhKpFg&limit=1'


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to loaction services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search ', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;