export async function handler(event) {
  const TOKEN = process.env.MY_SECRET_TOKEN;
  const query = Object.fromEntries(new URLSearchParams(event.queryStringParameters));
  const body = event.body ? JSON.parse(event.body) : {};
  const type = body.type || query.type;

  const call = async (ep, method="GET", payload=null) => {
    const res = await fetch(`https://api.printful.com${ep}`, {
      method,
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: payload ? JSON.stringify(payload) : null
    });
    return res.json();
  };

  // Auto store: get all products
  if (type === "all_products") {
    return {
      statusCode: 200,
      body: JSON.stringify(await call(`/products`))
    };
  }

  // Single product
  if (type === "product") {
    return {
      statusCode: 200,
      body: JSON.stringify(await call(`/products/${body.payload.id}`))
    };
  }

  return { statusCode: 400, body: JSON.stringify({ error: "Bad type" }) };
}


