
// functions/get-products.js
// English comments inside code (as requested)
// This function fetches synced products from Printful using server-side secret.
// It must NOT expose the API key to the browser.

//const fetch = require('node-fetch'); // Netlify supports node-fetch
exports.handler = async function(event, context) {
  const PRINTFUL_KEY = process.env.MY_SECRET_TOKEN;
  if (!PRINTFUL_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Printful key missing' }) };
  }

  try {
    // Example endpoint: GET /store/products (returns synced store products)
    const res = await fetch('/*https://api.printful.com/store/products*/https://api.printful.com/v2/stores/{store_id}', {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
