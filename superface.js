const { getClient } = require("./client");

// get centralized superface client
const client = getClient();

/**
 * Geocode
 * https://superface.ai/address/geocoding
 *
 * available providers: mock, google-apis, opencage
 *
 * @param input
 *   - street address, city, ...
 *   - more info in ./superface/grid/address/geocoding.supr
 */
async function getCoordinates(input, service) {
  const profile = await client.getProfile("address/geocoding");
  const provider = await client.getProvider(service);
  const result = await profile.useCases.Geocode.perform(input, {provider});

  let success = false,
    message,
    log;
  if (result.isErr()) {
    message = "Some of the fields contain invalid address information";
    log = result.error;

    console.log(message);
  } else {
    const { latitude, longitude } = result.value;
    message = `Lat: ${latitude}, Lon: ${longitude}`;
    log = JSON.stringify(result.value, null, 2);
    success = true;

    console.log(result.value);
  }

  return {
    success,
    message,
    log
  };
}

module.exports = {
  getCoordinates
};
