export async function handler(event, context) {
  const TOKEN = process.env.MY_SECRET_TOKEN;

  if (!TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token missing" })
    };
  }

  const { type, payload } = JSON.parse(event.body || "{}");

  // دالة عامة للاتصال بـ Printful
  const callPrintful = async (endpoint, method = "GET", body = null) => {
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

  // ---- 1) جلب معلومات المنتج ----
  if (type === "product") {
    return {
      statusCode: 200,
      body: JSON.stringify(await callPrintful(`/products/${payload.id}`))
    };
  }

  // ---- 2) جلب الضرائب ----
  if (type === "tax") {
    return {
      statusCode: 200,
      body: JSON.stringify(await callPrintful(`/tax/rates?country_code=${payload.country}`))
    };
  }

  // ---- 3) جلب أسعار الشحن ----
  if (type === "shipping") {
    return {
      statusCode: 200,
      body: JSON.stringify(await callPrintful(`/shipping/rates`, "POST", payload))
    };
  }

  // ---- 4) إنشاء طلب ----
  if (type === "create_order") {
    return {
      statusCode: 200,
      body: JSON.stringify(await callPrintful(`/orders`, "POST", payload))
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Invalid type" })
  };
}
