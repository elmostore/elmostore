// netlify/functions/printful-proxy.js

import fetch from "node-fetch"

export async function handler(event, context) {
  const token = process.env.PRINTFUL_TOKEN
  const base = "https://api.printful.com"

  // مثال: /api/store/products → يُرجع /store/products من Printful
  const path = event.path.replace("/.netlify/functions/printful-proxy", "")

  const url = base + path + (event.rawQuery ? "?" + event.rawQuery : "")

  const options = {
    method: event.httpMethod,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }

  if (event.httpMethod !== "GET" && event.body) {
    options.body = event.body
  }

  try {
    const res = await fetch(url, options)
    const data = await res.text()

    return {
      statusCode: res.status,
      headers: { "Content-Type": "application/json" },
      body: data
    }

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}
