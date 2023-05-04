const linebot = require('linebot');
const serpApi = require('serpapi');
const googleMapsClient = require('@google/maps').createClient({
  key: 'bd9c0bbd3174492e2e9675f0821a9f55bc812fe70360ced0fc4bd437bb2038bf',
});

const bot = linebot({
  channelId: '1660968430',
  channelSecret: 'f0e4cf7d960ca459ee685435f3e62484',
  channelAccessToken: '2bgzL7OqHoayxA7mgWmYHoL0ozfpczg8dSoOWMI6GSpKMVh8A1oclmCWyG0eALhg6lnu0DC/Z4fO8ZjpY7bJa8LKjqHm1GSe0kWActFre2FvhGl7Haorz/jcR8oCE2BYkncXAIbaXou9ZElEl4oGugdB04t89/1O/w1cDnyilFU=',
});

bot.on('message', async (event) => {
  const query = event.message.text;
  const searchResult = await serpApi.search({
    engine: 'google',
    q: query,
    google_domain: 'google.com',
    api_key: 'AIzaSyDkB9e529QwtWT4yl8bKahJDWDFQE1LpiM',
  });
  const firstResult = searchResult.organic_results[0];
  const address = firstResult.address;
  const location = await new Promise((resolve, reject) => {
    googleMapsClient.geocode({
      address: address,
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.json.results[0].geometry.location);
      }
    });
  });
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
  const message = {
    type: 'location',
    title: firstResult.title,
    address: firstResult.address,
    latitude: location.lat,
    longitude: location.lng,
    originalContentUrl: mapUrl,
  };
  event.reply(message);
});

