const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=59979f2523b6bae5529bc5336a7cb9f2&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degees out. It feels like ${body.current.feelslike} degress out.`
      );
    }
  });
};

module.exports = forecast;
