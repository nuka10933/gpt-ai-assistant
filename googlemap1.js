const SerpApi = require('google-search-results-nodejs');
const serpApi = new SerpApi.GoogleSearchResults(bd9c0bbd3174492e2e9675f0821a9f55bc812fe70360ced0fc4bd437bb2038bf);

async function searchLocation(query) {
  const params = {
    q: query,
    num: 1,
    tbm: 'map',
    api_key: bd9c0bbd3174492e2e9675f0821a9f55bc812fe70360ced0fc4bd437bb2038bf
  };

  try {
    const result = await serpApi.json(params);
    const locationUrl = result.maps_results[0].url;
    return locationUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
