export async function createOrder(order) {
  const res = await fetch("/.netlify/functions/printful-proxy/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  })
  return await res.json()
}
