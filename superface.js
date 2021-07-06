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
    log = { kind: result.error.kind, message: result.error.message };
  } else {
    message = `Lat: ${result.value.latitude}, Lon: ${result.value.longitude}`;
    log = result.value;
    success = true;
  }

  console.log(message);

  return {
    success,
    message,
    log
  };
}

module.exports = {
  getCoordinates
};
