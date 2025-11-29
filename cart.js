export function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  cart.push({ product_id: id, qty: 1 })
  localStorage.setItem("cart", JSON.stringify(cart))
  alert("تمت الإضافة")
}
