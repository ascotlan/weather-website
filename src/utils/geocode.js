const request = require("postman-request");

const geocode = (location, callback) => {
  function format(location) {
    return location.trim().replace(/\s/g, "%20");
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${format(
    location
  )}.json?access_token=pk.eyJ1IjoiYXNjb3RsYW4iLCJhIjoiY2xodmR1Z3dsMDdlcTNlcDJrcjkwaGR3NyJ9.8_zCf0Tw3sviV4_PjcR3lg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geolocation service!");
    } else if (!body.features.length) {
      callback(
        "Unable to find location. Try again with different search term."
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
