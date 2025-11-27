export async function handler(event) {
  const TOKEN = process.env.MY_SECRET_TOKEN;
  const { type, payload } = JSON.parse(event.body || "{}");

  const call = async (endpoint, method = "GET", body = null) => {
    const res = await fetch(`https://api.printful.com${endpoint}`, {
      method,
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: body ? JSON.stringify(body) : null
    });

    return res.json();
  };

  if (type === "product") {
    return { statusCode: 200, body: JSON.stringify(await call(`/products/${payload.id}`)) };
  }

  if (type === "tax") {
    return { statusCode: 200, body: JSON.stringify(await call(`/tax/rates?country_code=${payload.country}`)) };
  }

  if (type === "shipping") {
    return { statusCode: 200, body: JSON.stringify(await call(`/shipping/rates`, "POST", payload)) };
  }

  if (type === "create_order") {
    return { statusCode: 200, body: JSON.stringify(await call(`/orders`, "POST", payload)) };
  }

  return { statusCode: 400, body: JSON.stringify({ error: "Bad type" }) };
}
