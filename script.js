async function loadCountries() {
  const res = await fetch("/.netlify/functions/countries");
  const countries = await res.json();

  const select = document.getElementById("country");

  countries.forEach(c => {
    const option = document.createElement("option");
    option.value = c.code;
    option.textContent = c.name;
    select.appendChild(option);
  });

  select.onchange = () => loadStates(select.value);
}

async function loadStates(countryCode) {
  const res = await fetch("/.netlify/functions/states?country=" + countryCode);
  const states = await res.json();

  const stateSelect = document.getElementById("state");
  stateSelect.innerHTML = "";

  if (states.length === 0) {
    stateSelect.classList.add("hidden");
  } else {
    stateSelect.classList.remove("hidden");
    states.forEach(s => {
      const option = document.createElement("option");
      option.value = s.code;
      option.textContent = s.name;
      stateSelect.appendChild(option);
    });
  }

  // Brazil CPF field
  const taxBox = document.getElementById("tax-number-container");
  const taxInput = document.getElementById("tax_number");

  if (countryCode === "BR") {
    taxBox.classList.remove("hidden");
    taxInput.placeholder = "CPF (Brazil)";
  } else {
    taxBox.classList.add("hidden");
  }
}

async function calculate() {
  const data = collectAddress();

  const tax = await fetch("/.netlify/functions/taxes", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(r => r.json());

  const shipping = await fetch("/.netlify/functions/shipping", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(r => r.json());

  document.getElementById("summary").innerHTML = `
    <b>Tax:</b> ${tax.total_tax || "N/A"}<br>
    <b>Shipping:</b> ${shipping.rate || "N/A"}
  `;
}

function collectAddress() {
  return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,

    country_code: document.getElementById("country").value,
    state_code: document.getElementById("state").value,
    city: document.getElementById("city").value,
    address1: document.getElementById("address1").value,
    zip: document.getElementById("zip").value,

    tax_number: document.getElementById("tax_number").value
  };
}

async function createOrder() {
  const data = collectAddress();

  const result = await fetch("/.netlify/functions/order", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(r => r.json());

  document.getElementById("order-result").innerHTML =
    `<b>Order created!</b><br>ID: ${result.id}`;
}

loadCountries();
