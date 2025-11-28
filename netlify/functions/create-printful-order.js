// functions/create-printful-order.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const PRINTFUL_KEY = process.env.PRINTFUL_API_KEY;
  if (!PRINTFUL_KEY) return { statusCode: 500, body: 'No Printful key' };

  // event.body expected to contain JSON with order details from your frontend
  const body = JSON.parse(event.body || '{}');

  // Build Printful order payload. Adapt product/variant ids and files accordingly.
  const printfulPayload = {
    recipient: {
      name: body.name,
      address1: body.address1,
      city: body.city,
      state_code: body.state,
      country_code: body.country_code,
      zip: body.zip,
      email: body.email
    },
    items: body.items // array of items: { variant_id, quantity, name, files? }
  };

  try {
    const res = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(printfulPayload)
    });
    const data = await res.json();
    // Return Printful response to frontend or process it (save order id etc.)
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
