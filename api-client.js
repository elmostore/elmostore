export const API = "/.netlify/functions/printful-proxy"

export async function getProducts() {
  const res = await fetch(`${API}/store/products`)
  return await res.json()
}

export async function getProduct(id) {
  const res = await fetch(`${API}/store/products/${id}`)
  return await res.json()
}
